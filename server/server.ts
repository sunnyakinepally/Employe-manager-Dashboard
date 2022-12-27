const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const pj = require('./project.json')
const s=require('./skills.json')
const fs = require('fs');
const prev = require('./previousProjects.json')
const jwt = require('jsonwebtoken')
server.use(middlewares);
server.use(jsonServer.bodyParser);




server.get('/users', (req: any, res: any, next: any) => {
  const users = readUsers()
  // console.log("these are p details",users)
  if (users.length > 0) {
    res.send({ statusCode: 200, message: 'users fetched Successfully', users: users });
  } else {
    res.send({ statusCode: 401, message: 'no users' });
  }
})

server.get('/projects', (req: any, res: any, next: any) => {
  const projects = readproject()
  // console.log("these are p details",projects)
  if (projects.length > 0) {
    res.send({ statusCode: 200, message: 'projects fetched Successfully', projects: projects });
  } else {
    res.send({ statusCode: 401, message: 'no projets' });
  }
})

server.get('/prevproject',(req:any,res:any)=>{
  // const prev=readPreviousProjects() ? readPreviousProjects() : []
  
  const prevprojarray=prev.prevProjects
  console.log("rev",prevprojarray)
  if(prevprojarray.length>0){
    res.send({ statusCode: 200, message: 'projects fetched Successfully', prevprojects: prevprojarray });
  }else {
    res.send({ statusCode: 401, message: 'no previous projets' });
  }
})

server.get('/skills',(req:any,res:any,next:any)=>{
const skills=readskills()

if(skills.length>0){
  res.send({ statusCode: 200, message: 'skills fetched Successfully', skills: skills });
  } else {
    res.send({ statusCode: 401, message: 'no skills' });
  }
})

server.post('/login', (req: any, res: any, next: any) => {
  const users = readUsers();

  // console.log("this is request", req.body)
  const user = users.filter((value: any) => value.mobile_number == req.body.mobile_number && value.password == req.body.pass);
  // console.log("here is user", user)
  if (user.length > 0) {
    let payload = {

      id: user.id,

      mobile: user.mobile_number,

      name: user.last_name

    };

    let token = jwt.sign(payload, "" + process.env["JWT_KEY"], { expiresIn: "1d" });
    console.log("checking token", token)
    res.send({ statusCode: 200, message: 'now logedin ', token: token });
  } else {
    res.send({ statusCode: 401, message: 'incorrect username or password' });
  }
});

server.post('/register', (req: any, res: any) => {
  let randnumber = Math.floor(Math.random() * 999) + 100;
  let registerobj = {
    id: randnumber,
    firstname: req.body.first_name,
    middlename: req.body.last_name,
    lastname: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    mobile_number: req.body.mobile_number,
    password: req.body.password,
    address: "",
    Postal_Code: "",
    Qualification: "",
    total_Experience: "",
    Start_Date_Date: "",
    End_Date_Date: "",
    Type_of_Employee: "",
    Designation: req.body.Designation,
    Gender: "",
    Marital_Status: "",
  }
  console.log("body", registerobj)
  const users = readUsers();
  const user = users.filter((u: any) => u.mobile_number === req.body.mobile_number)[0];
  if (user === undefined || user === null) {
    // res.send({
    //   ...formatUser(req.body),
    //   token: checkIfAdmin(req.body)
    // });
    db.users.push(registerobj);
    fs.writeFile('./server/db.json', JSON.stringify({ "users": db.users }), function (err: any) {
      if (err) {
        res.status(500).jsonp({ error: 'Failed to write file' });
      }
      res.send({ statusCode: 200, message: 'Registration Completed' });
    });
    // console.log("pushing here",db.users)
  } else {
    res.send({ statusCode: 200, message: 'User Already Exists' });
  }
});

// server.post('/memberremove', (req: any, res: any) => {
//   // res.send({ statusCode:200,message:'update Completed' });
//   console.log("removed", req.body.id)
//   const users = readUsers();
//   const id = req.body.id
//   const userprojectArry: never[] = []


//   for (var i in users) {
//     for (var j in id) {
//       if (users[i].id == id[j].id) {
//         console.log("matched")
//         // const findproj = userprojectArry.filter((u: any) => u.Project_ID == userproj.Project_ID)[0];

//         users[i].projects = userprojectArry;
//       } else {
//         db.users.push(users)
//       }
//     }
//     db.users.push(users[i]);

//   }

//   fs.writeFile('./server/db.json', JSON.stringify({ "users": users }), function (err: any) {
//     if (err) {
//       res.status(500).send({ error: 'Failed to write file' });
//     }
//     res.send({ statusCode: 200, message: 'User Added Successfully' });
//   });

//   // if(users[0].id ==id){
//   //   // console.log("matched")

//   // }else{
//   //   console.log("not matvhed")
//   // }
// });

server.patch('/update', (req: any, res: any) => {
  const projects = readproject();
  // const project = projects.filter((u:any) => u.Project_ID === req.body.Project_ID)[0];
  // res.send({ statusCode:200,message:'update Completed' });
  const allusers = readUsers()
  const userids = req.body.member
  const projectArry = []
  const userdetailarray = []
  let updated = req.body
  // console.log("these are existing", projects)
  for (var i in userids) {
    const userdt = allusers.filter((u: any) => u.id === userids[i].id)[0];
    userdetailarray.push(userdt)
  }
  // console.log("userdetailarray", userdetailarray)
  let userproj = {
    Project_ID: updated.Project_ID,
    Project_Name: req.body.Project_Name,
    Company_Name: req.body.Company_Name,
    Project_Status: req.body.Project_Status,
    Company_Phone: req.body.Company_Phone,
    Employee_ID_Number: req.body.Employee_ID_Number,
    project_Start_Date: req.body.project_Start_Date,
    project_End_Date: req.body.project_End_Date
  }

  if (userids.length > 0) {
    for (var i in allusers) {
      for (var j in userids) {
        if (allusers[i].id == userids[j].id) {
          const findproj = projectArry.filter((u: any) => u.Project_ID == userproj.Project_ID)[0];
          console.log("findproj", findproj)
          if (!findproj) {
            projectArry.push(userproj)
          }
          allusers[i].projects = projectArry;
          break; //Stop this loop, we found it!
        }
      }
      db.users.push(allusers[i]);
    }
  }


  for (var i in projects) {
    if (projects[i].Project_ID == updated.Project_ID) {
      projects[i].Project_Name = updated.Project_Name;
      projects[i].Company_Name = updated.Company_Name;
      projects[i].Project_Status = updated.Project_Status;
      projects[i].Company_Phone = updated.Company_Phone;
      projects[i].Employee_ID_Number = updated.Employee_ID_Number;
      projects[i].project_Start_Date = updated.project_Start_Date;
      projects[i].project_End_Date = updated.project_End_Date;
      projects[i].member = userdetailarray;
      break; //Stop this loop, we found it!
    }
    pj.projects.push(projects[i]);
  }
  // console.log("updated project details", projects)
  fs.writeFile('./server/project.json', JSON.stringify({ "projects": projects })
    , function (err: any) {
      if (err) {
        res.status(500).jsonp({ error: 'Failed to write file' });
      }
      fs.writeFile('./server/db.json', JSON.stringify({ "users": allusers }), function (err: any) {
        if (err) {
          res.status(500).send({ error: 'Failed to write file' });
        }
        res.send({ statusCode: 200, message: 'User Added Successfully' });
      });
    });



});

// deleting previous project for user

server.post('/delete-previous-project', (req: any, res: any) => {

  console.log("previouProjectsarray",req.body)
  const filtered = prev.prevProjects.filter((value: any) => value.userId == req.body.id && value.Project_ID == req.body.projId);
  if(filtered.length>0){
    console.log("previouProjectsarray1",prev.prevProjects)
    prev.prevProjects.splice(prev.prevProjects.findIndex((a: any) => a.userId == req.body.id && a.Project_ID == req.body.projId), 1)

  }
  console.log("previouProjectsarray2",prev.prevProjects)

  fs.writeFile('./server/previousProjects.json', JSON.stringify({ "prevProjects": prev.prevProjects }), function (err: any) {

    if (err) {
res.status(500).send({ error: 'Failed to write file' });
}
 res.send({ statusCode: 200, message: 'Updated Successfully' });

  });

})


server.post('/delete-project', (req: any, res: any) => {
  const allusers = readUsers()
  const projects = readproject()
  const allprevprojects = readPreviousProjects()
  const user = allusers.filter((value: any) => value.id == req.body.id)[0];
  // console.log("comig",user.projects)
  // console.log("body",req.body)
  if(user){
    user.projects.splice(user.projects.findIndex((a: any) => a.Project_ID === req.body.projId), 1)
    fs.writeFile('./server/db.json', JSON.stringify({ "users": allusers }), function (err: any) {
      if (err) {
        res.status(500).send({ error: 'Failed to write file' });
      }
    });
  }
  const projectFind = projects.filter((u: any) => u.Project_ID === req.body.projId)[0];
  // console.log("projectfind",projectFind)
  // console.log("projectfind.member",projectFind.member)
  
  if(projectFind){
    projectFind.member.splice(projectFind.member.findIndex((a: any) => a.id === req.body.id), 1)
    fs.writeFile('./server/project.json', JSON.stringify({ "projects": projects }), function (err: any) {
      if (err) {
        res.status(500).send({ error: 'Failed to write file' });
      }
    });
    delete projectFind.member;
    projectFind.userId = req.body.id;
    prev.prevProjects.push(projectFind)
    fs.writeFile('./server/previousProjects.json', JSON.stringify({ "prevProjects": prev.prevProjects }), function (err: any) {
          if (err) {
            res.status(500).send({ error: 'Failed to write file' });
          }
          res.send({ statusCode: 200, message: 'Updated Successfully' });
        });
  }
})





server.post('/add', (req: any, res: any) => {
  let randnumber = Math.floor(Math.random() * 999) + 100;
  const allusers = readUsers()
  const userids = req.body.member
  const projectArry = []
  const userdetailarray = []
  for (var i in userids) {
    const userdt = allusers.filter((u: any) => u.id === userids[i].id)[0];
    // console.log("coming here",userdt)
    userdetailarray.push(userdt)
  }
  // console.log("array ", userdetailarray)

  let addobj = {
    Project_ID: randnumber,
    Project_Name: req.body.Project_Name,
    Company_Name: req.body.Company_Name,
    Project_Status: req.body.Project_Status,
    Company_Phone: req.body.Company_Phone,
    Employee_ID_Number: req.body.Employee_ID_Number,
    project_Start_Date: req.body.project_Start_Date,
    project_End_Date: req.body.project_End_Date,
    member: userdetailarray,
    id:req.body.id
  }
  let userproject = {
    Project_ID: addobj.Project_ID,
    Project_Name: req.body.Project_Name,
    Company_Name: req.body.Company_Name,
    Project_Status: req.body.Project_Status,
    Company_Phone: req.body.Company_Phone,
    Employee_ID_Number: req.body.Employee_ID_Number,
    project_Start_Date: req.body.project_Start_Date,
    project_End_Date: req.body.project_End_Date,
  }

  if (userids.length > 0) {

    for (var i in allusers) {

      for (var j in userids) {

        if (allusers[i].id == userids[j].id) {

          const findproj = projectArry.filter((u: any) => u.Project_ID == userproject.Project_ID)[0];

          if (!findproj) {

            projectArry.push(userproject)

          }

          console.log("inside if")

          allusers[i].projects = projectArry;
          break; //Stop this loop, we found it!
        }
      }
      db.users.push(allusers[i]);

    }

  }
  // console.log("db usersss update", db.users)

  // console.log("aded data",addobj)
  const projects = readproject();
  const project = projects.filter((u: any) => u.Project_Name == req.body.Project_Name)[0];

  if (project === undefined || project === null) {
    // res.send({
    //   ...formatUser(req.body),
    //   token: checkIfAdmin(req.body)
    // });

    pj.projects.push(addobj)
    fs.writeFile('./server/project.json', JSON.stringify({ "projects": pj.projects }), function (err: any) {
      if (err) {
        res.status(500).jsonp({ error: 'Failed to write file' });
      }

    });
    fs.writeFile('./server/db.json', JSON.stringify({ "users": allusers }), function (err: any) {
      if (err) {
        res.status(500).jsonp({ error: 'Failed to write file' });
      }
      res.send({ statusCode: 200, message: 'Registration Completed' });
    });



  } else {
    res.send({ statusCode: 200, message: 'project Already Exists' });
  }
});

        // Emloyee profile update 

server.patch('/profileupdate', (req: any, res: any) => {
  
  // const project = projects.filter((u:any) => u.Project_ID === req.body.Project_ID)[0];
  // res.send({ statusCode:200,message:'update Completed' });
  const allusers = readUsers()
 
  // const userids = req.body.member
  // const projectArry = []
  // const userdetailarray = []
  let updated = req.body
  console.log("updated profile",updated)
  // console.log("these are existing", projects)
  // for (var i in userids) {
  //   const userdt = allusers.filter((u: any) => u.id === userids[i].id)[0];
  //   userdetailarray.push(userdt)
  // }

 for (var i in allusers) {
    if (allusers[i].id == updated.id) {
      allusers[i].firstname = updated.firstname;
      allusers[i].middlename = updated.middlename;
      allusers[i].lastname = updated.lastname;
      allusers[i].date_of_birth = updated.date_of_birth;
      allusers[i].mobile_number = updated.mobile_number;
      allusers[i].password = updated.password;
      allusers[i].address = updated.address;
      allusers[i].Postal_Code = updated.Postal_Code;
      allusers[i].Qualification = updated.Qualification;
      allusers[i].total_Experience = updated.total_Experience;
      allusers[i].Start_Date_Date = updated.Start_Date_Date;
      allusers[i].End_Date_Date = updated.End_Date_Date;
      allusers[i].Type_of_Employee = updated.Type_of_Employee;
      allusers[i].Gender = updated.Gender;
      allusers[i].Marital_Status = updated.Marital_Status;
      
      break; //Stop this loop, we found it!
    }
    // console.log("will go for json",allusers[i])
    db.users.push(allusers[i]);
  }

      fs.writeFile('./server/db.json', JSON.stringify({ "users": allusers }), function (err: any) {
        if (err) {
          res.status(500).send({ error: 'Failed to write file' });
        }
        res.send({ statusCode: 200, message: 'User Added Successfully' });
      });
 

});

      // Employee skills delete 

server.post('/skillsdelete',(req: any, res: any)=>{
const skills=readskills();

  console.log("selected id",req.body)
  console.log("empid",req.body.empid)
  const filterskill=skills.filter((u:any)=>u.id == req.body.empid)[0]
  // console.log("filterd here",filterskill)
  if(filterskill){
    filterskill.skills.splice(filterskill.skills.findIndex((a: any) => a.id === req.body.id), 1)
  }
  fs.writeFile('./server/skills.json', JSON.stringify({ "skillsarray": skills }), function (err: any) {
    if (err) {
      res.status(500).jsonp({ error: 'Failed to write file' });
    }
    res.send({ statusCode: 200, message: 'Registration Completed' });
  });
  console.log("skills",skills)

})


          // Employee skills adding 


          server.post('/addskill', (req: any, res: any) => {
            let randnumber = Math.floor(Math.random() * 999) + 100;
            const skills = readskills();
            const skillaray = []
            console.log("addedskill", req.body.empid)
            const id = { "id": req.body.empid, "skills": [{ "id": randnumber, "name": req.body.name }] }
            let addobj = {
              id: randnumber,
              name: req.body.name,
            }
            const filter = skills.filter((u: any) => u.id == req.body.empid)[0];
            if (filter) {
              for (var i in skills) {
                if (skills[i].id == req.body.empid) {
                  skills[i].skills.push(addobj)
                }
              }
            }
            else {
              skills.push(id)
            }
            console.log("updated skills", skills)
            fs.writeFile('./server/skills.json', JSON.stringify({ "skillsarray": skills }), function (err: any) {
              if (err) {
                res.status(500).jsonp({ error: 'Failed to write file' });
              }
              res.send({ statusCode: 200, message: 'Registration Completed' });
            });
          })


server.get('/dropdown-users', (req: any, res: any, next: any) => {
  const users = readUsers()
  const usersArray = []
  const selectedArray = []
  if (users.length > 0) {
    // console.log("usersdrop",users)
    for (var i in users) {
     if(users[i].projects == undefined || users[i].projects.length == 0){
        usersArray.push(users[i])
     }else if(users[i].projects.length > 0){
      selectedArray.push(users[i])
     }
    }
    res.send({ statusCode: 200, message: 'users fetched Successfully', users: usersArray });
  } else {
    res.send({ statusCode: 401, message: 'no users' });
  }
})

// server.use('/users', (req, res, next) => {
//   if (isAuthorized(req) || req.query.bypassAuth === 'true') {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// });

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

function formatUser(user: any) {
  delete user.password;
  user.role = user.username === 'admin'
    ? 'admin'
    : 'user';
  return user;
}

function checkIfAdmin(user: any, bypassToken = false) {
  return user.username === 'admin' || bypassToken === true
    ? 'admin-token'
    : 'user-token';
}

// function isAuthorized(req) {
//   return req.headers.authorization === 'admin-token' ? true : false;
// }

function readUsers() {
  const dbRaw = fs.readFileSync('./server/db.json');
  const users = JSON.parse(dbRaw).users
  return users;
}

function readproject() {
  const dbRaw = fs.readFileSync('./server/project.json');
  const projects = JSON.parse(dbRaw).projects
  return projects;
}

function readskills(){
  const dbRaw = fs.readFileSync('./server/skills.json');
  const skillsarray = JSON.parse(dbRaw).skillsarray
  return skillsarray;
}

function readPreviousProjects() {
const dbRaw = fs.readFileSync('./server/previousProjects.json');
const previouProjectsarray = JSON.parse(dbRaw).previouProjectsarray
 return previouProjectsarray;



}