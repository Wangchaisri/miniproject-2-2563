const express = require("express"),
  app = express(),
  passport = require("passport"),
  port = process.env.PORT || 80,
  cors = require("cors"),
  cookie = require("cookie");

const bcrypt = require("bcrypt");

const db = require("./database.js");
let users = db.users;

require("./passport.js");

const router = require("express").Router(),
  jwt = require("jsonwebtoken");

app.use("/api", router);
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("Login: ", req.body, user, err, info);
    if (err) return next(err);
    if (user) {
        if (req.body.remember == true) {
          time_exp = "7d";
        } else time_exp = "1d";
        const token = jwt.sign(user, db.SECRET, {
          expiresIn: time_exp,
        });
        var decoded = jwt.decode(token);
        let time = new Date(decoded.exp * 1000);
        console.log(new Date(decoded.exp * 1000));
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60,
              sameSite: "strict",
              path: "/",
          })
      );
      res.statusCode = 200;
      return res.json({ user, token });
    } else return res.status(422).json(info);
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  return res.json({ message: "Logout successful" });
});

/* GET user profile. */
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send(req.user);
  }
);
/* GET user foo. */
router.get(
  "/foo",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
      res.status(200).json({ message: "Foo" });
  }
);

router.post("/register", async (req, res) => {
  try {
    const SALT_ROUND = 10;
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.json({ message: "Cannot register with empty string" });
    if (db.checkExistingUser(username) !== db.NOT_FOUND)
      return res.json({ message: "Duplicated user" });

    let id = users.users.length? users.users[users.users.length - 1].id + 1: 1;
    hash = await bcrypt.hash(password, SALT_ROUND);
    users.users.push({ id, username, password: hash, email });
    res.status(200).json({ message: "Register success" });
  } catch {
    res.status(422).json({ message: "Cannot register" });
  }
});

router.get("/alluser", (req, res) => res.json(db.users.users));

router.get("/", (req, res, next) => {
  res.send("Respond without authentication");
});

  let students = {
      list: [
        { "id": 1, "ชื่อขนมไทย": "จ่ามงกุฎ","หมายถึง": "อยู่ตำแหน่งสูงสุดเสมือนมงกุฎ แสดงถึงความมีเกียรติยศชื่อเสียง","นิยม": "ใช้ประกอบเครื่องคาวหวานในงานแต่ง" ,"Price": 299 ,"รูป": "/b6.jpg" },
        { "id": 2, "ชื่อขนมไทย": "ขนมชั้น","หมายถึง": "การได้เลื่อนชั้น เลื่อนตำแหน่ง เลื่อนยศฐาบรรดาศักดิ์","นิยม": "ทำให้มี 9 ชั้น เพื่อความเป็นสิริมงคล" ,"Price": 159 ,"รูป": "/b7.jpg" },
        { "id": 3, "ชื่อขนมไทย": "ทองเอก","หมายถึง": "ความก้าวหน้าทางการงาน","นิยม": "ใช้เป็นขนมอวยพรเมื่อได้เลื่อนตำแหน่งหน้าที่การงาน" ,"Price": 259 ,"รูป": "/b6.jpg" },
        { "id": 4, "ชื่อขนมไทย": "ทองหยิบ","หมายถึง": "ความร่ำรวย มั่งคั่ง หยิบจับการงานใดๆ ก็เป็นเงินเป็นทองและชีวิตคู่รุ่งเรือง","นิยม": "ใช้ในงานมงคลหรือใช้เป็นขนมอวยพร" ,"Price": 199 ,"รูป": "/b3.jpg" },
        { "id": 5, "ชื่อขนมไทย": "ทองหยอด","หมายถึง": "ขอให้ร่ำรวย มีเงินมีทองใช้","นิยม": "ใช้เป็นขนมอวยพร" ,"Price": 199 ,"รูป": "/b3.jpg" },
        { "id": 6, "ชื่อขนมไทย": "ฝอยทอง","หมายถึง": "คู่บ่าวสาวที่จะได้ครองรักกันยั่งยืนและมีอายุยืนยาวเหมือนฝอยทอง","นิยม": "ให้เพื่อเสริมความยืดยาวแก่การแต่งงาน" ,"Price": 259 ,"รูป": "/b3.jpg" },
        { "id": 7, "ชื่อขนมไทย": "เม็ดขนุน","หมายถึง": "มีคนช่วยสนับสนุนค้ำจุนในหน้าที่การงาน การดำเนินชีวิต ไม่ว่าจะประกอบกิจการใดๆ ก็จะประสบผลสำเร็จ","นิยม": "ให้เพื่อค้ำจุน" ,"Price": 199 ,"รูป": "/b6.jpg" },
        { "id": 8, "ชื่อขนมไทย": "ดาราทอง","หมายถึง": "หัวหน้าผู้เป็นใหญ่","นิยม": "ให้ผู้ที่ได้รับการยกย่องอย่างสูงเนื่องจากมีวิธีทำที่ค่อนข้างยาก" ,"Price": 259 ,"รูป": "/b6.jpg" },
        { "id": 9, "ชื่อขนมไทย": "ถ้วยฟู","หมายถึง": "ความเป็นสิริมงคลและความเจริญก้าวหน้าของชีวิตคู่ หรืออวยพรให้รุ่งเรืองเฟื่องฟูเหมือนขนมถ้วยฟู","นิยม": "ใช้ในงานมงคลต่างๆ นำมาใช้ในพิธีแต่งงาน" ,"Price": 99 ,"รูป": "/b3.jpg" },
        { "id": 10, "ชื่อขนมไทย": "เสน่ห์จันทน์","หมายถึง": "การเป็นที่รักของทุกคน ไปไหนก็มีแต่คนรักใคร่ และความมีเสน่ห์","นิยม": "ให้เพื่อเสริมความมีเสน่ห์" ,"Price": 359 ,"รูป": "/b3.jpg" },
        { "id": 11, "ชื่อขนมไทย": "กงหรือขนมกงเกวียน","หมายถึง": "การอวยพรให้บ่าวสาวครองรักกันชั่วนิรันดร์","นิยม": "ให้ในงานมงคลเพื่ออวยพรให้บ่าวสาว" ,"Price": 159 ,"รูป": "/b3.jpg" },
        { "id": 12, "ชื่อขนมไทย": "สามเกลอ","หมายถึง": "ความสามัคคีและไม่มีวันพรากจากกัน","นิยม": "ใช้เป็นขนมเสี่ยงทายในงานแต่ง" ,"Price": 259 ,"รูป": "/b3.jpg" },
        { "id": 13, "ชื่อขนมไทย": "ข้าวเหนียวแก้ว","หมายถึง": "จะมีแต่ความเหนียวแน่น เป็นปึกแผ่นมั่นคง","นิยม": "ใช้ในงานมงคลชีวิต" ,"Price": 199 ,"รูป": "/b3.jpg" }
      ]
    }
  
  
  router
    .route("/students")
    .get((req, res) => {
      res.send(students);
    })
    .post((req, res) => {
      console.log(req.body);
      let newstudent = {};
      newstudent.id = students.list.length ? students.list[students.list.length - 1].id + 1 : 1;
      newstudent.ชื่อขนมไทย = req.body.ชื่อขนมไทย;
      newstudent.surname= req.body.surname;
      newstudent.major = req.body.major;
      newstudent.Price= req.body.Price;
      students = { list: [...students.list, newstudent] };
      res.json(students);
    });
  
  router
    .route("/students/:studentid")
    .get((req, res) => {
      let id = students.list.findIndex((item) => +item.id == +req.params.studentid)
      res.json(students.list[id]);
    })
    .put((req, res) => {
      let id = students.list.findIndex((item) => item.id == +req.params.studentid);
      students.list[id].ชื่อขนมไทย = req.body.ชื่อขนมไทย;
      students.list[id].surname = req.body.surname;
      students.list[id].major = req.body.major;
      students.list[id].Price = req.body.Price;
      res.json(students.list);
    })
    .delete((req, res) => {
      students.list = students.list.filter((item) => +item.id !== +req.params.studentid);
      res.json(students.list);
    });
  
  
  router.route("/purchase/:studentId")
  .post((req,res) => {
    let id = students.list.findIndex((item) => +item.id == +req.params.studentId)
    if (id == -1) {
      res.json({message: "Student not found"})
    }
    else {
      students.list = students.list.filter((item) => +item.id !== +req.params.studentId);
      res.json(students.list);
    }
  })

// Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    },
  });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));