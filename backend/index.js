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

  let thaidesserts = {
      list: [
        { "id": 1, "Dessert": "จ่ามงกุฎ","Mean": "อยู่ตำแหน่งสูงสุดเสมือนมงกุฎ แสดงถึงความมีเกียรติยศชื่อเสียง","Popular": "ให้ผู้ที่ได้รับการยกย่องอย่างสูงเนื่องจากมีวิธีทำที่ค่อนข้างยาก" ,"Price": 299 ,"รูป": "/pj1.jpg" },
        { "id": 2, "Dessert": "ขนมชั้น","Mean": "การได้เลื่อนชั้น เลื่อนตำแหน่ง เลื่อนยศฐาบรรดาศักดิ์","Popular": "ทำให้มี 9 ชั้น เพื่อความเป็นสิริมงคล" ,"Price": 159 ,"รูป": "/pj2.jpg" },
        { "id": 3, "Dessert": "ทองเอก","Mean": "ความก้าวหน้าทางการงาน","Popular": "ใช้เป็นขนมอวยพรเมื่อได้เลื่อนตำแหน่งหน้าที่การงาน" ,"Price": 259 ,"รูป": "/pj3.jpg" },
        { "id": 4, "Dessert": "ทองหยิบ","Mean": "ความร่ำรวย มั่งคั่ง หยิบจับการงานใดๆ ก็เป็นเงินเป็นทองและชีวิตคู่รุ่งเรือง","Popular": "ใช้ในงานมงคลหรือใช้เป็นขนมอวยพร" ,"Price": 199 ,"รูป": "/pj4.jpg" },
        { "id": 5, "Dessert": "ทองหยอด","Mean": "ขอให้ร่ำรวย มีเงินมีทองใช้","Popular": "ใช้เป็นขนมอวยพร" ,"Price": 199 ,"รูป": "/pj5.jpg" },
        { "id": 6, "Dessert": "ฝอยทอง","Mean": "คู่บ่าวสาวที่จะได้ครองรักกันยั่งยืนและมีอายุยืนยาวเหมือนฝอยทอง","Popular": "ให้เพื่อเสริมความยืดยาวแก่การแต่งงาน" ,"Price": 259 ,"รูป": "/pj6.jpg" },
        { "id": 7, "Dessert": "เม็ดขนุน","Mean": "มีคนช่วยสนับสนุนค้ำจุนในหน้าที่การงาน การดำเนินชีวิต ไม่ว่าจะประกอบกิจการใดๆ ก็จะประสบผลสำเร็จ","Popular": "ให้เพื่อค้ำจุน" ,"Price": 199 ,"รูป": "/pj7.jpg" },
        { "id": 8, "Dessert": "กลีบลำดวน","Mean": "ช่วยทำให้มีชื่อเสียงขจรขจายและยังมีสร้างความงดงามให้กับคู่ชีวิต","Popular": "ใช้ในงานมงคล" ,"Price": 259 ,"รูป": "/pj8.jpg" },
        { "id": 9, "Dessert": "ถ้วยฟู","Mean": "ความเป็นสิริมงคลและความเจริญก้าวหน้าของชีวิตคู่ หรืออวยพรให้รุ่งเรืองเฟื่องฟูเหมือนขนมถ้วยฟู","Popular": "ใช้ในงานมงคลต่างๆ นำมาใช้ในพิธีแต่งงาน" ,"Price": 99 ,"รูป": "/pj9.jpg" },
        { "id": 10, "Dessert": "เสน่ห์จันทน์","Mean": "การเป็นที่รักของทุกคน ไปไหนก็มีแต่คนรักใคร่ และความมีเสน่ห์","Popular": "ให้เพื่อเสริมความมีเสน่ห์" ,"Price": 359 ,"รูป": "/pj10.jpg" },
        { "id": 11, "Dessert": "กงหรือขนมกงเกวียน","Mean": "การอวยพรให้บ่าวสาวครองรักกันชั่วนิรันดร์","Popular": "ให้ในงานมงคลเพื่ออวยพรให้บ่าวสาว" ,"Price": 159 ,"รูป": "/pj11.jpg" },
        { "id": 12, "Dessert": "สามเกลอ","Mean": "ความสามัคคีและไม่มีวันพรากจากกัน","Popular": "ใช้เป็นขนมเสี่ยงทายในงานแต่ง" ,"Price": 259 ,"รูป": "/pj12.jpg" },
        { "id": 13, "Dessert": "ข้าวเหนียวแก้ว","Mean": "จะมีแต่ความเหนียวแน่น เป็นปึกแผ่นมั่นคง","Popular": "ใช้ในงานมงคลชีวิต" ,"Price": 199 ,"รูป": "/pj13.jpg" },
        { "id": 14, "Dessert": "โพรงแสม","Mean": "เปรียบเสมือนเสาบ้านที่จะทำให้บ่าวสาวอยู่กันได้ยั่งยืนตลอดไป","Popular": "ใช้เป็นขนมแต่งงานที่เก่าแก่ ในสมัยโบราณ" ,"Price": 159 ,"รูป": "/pj14.jpg" },
        { "id": 15, "Dessert": "บุหลันดั้นเมฆ","Mean": "เลียนแบบเสมือนดวงจันทร์ลอยอยู่กลางท้องฟ้า","Popular": "ใช้เป็นขนมบุหลันดั้นเมฆนี้เป็นขนมเสี่ยงทาย เกี่ยวกับ หน้าที่การงาน" ,"Price": 199 ,"รูป": "/pj15.jpg" }
      ]
    }
  
  
  router
    .route("/thaidesserts")
    .get((req, res) => {
      res.send(thaidesserts);
    })
    .post((req, res) => {
      console.log(req.body);
      let newthaidessert = {};
      newthaidessert.id = thaidesserts.list.length ? thaidesserts.list[thaidesserts.list.length - 1].id + 1 : 1;
      newthaidessert.Dessert = req.body.Dessert;
      newthaidessert.Mean= req.body.Mean;
      newthaidessert.Popular = req.body.Popular;
      newthaidessert.Price= req.body.Price;
      thaidesserts = { list: [...thaidesserts.list, newthaidessert] };
      res.json(thaidesserts);
    });
  
  router
    .route("/thaidesserts/:thaidessertid")
    .get((req, res) => {
      let id = thaidesserts.list.findIndex((item) => +item.id == +req.params.thaidessertid)
      res.json(thaidesserts.list[id]);
    })
    .put((req, res) => {
      let id = thaidesserts.list.findIndex((item) => item.id == +req.params.thaidessertid);
      thaidesserts.list[id].Dessert = req.body.Dessert;
      thaidesserts.list[id].Mean = req.body.Mean;
      thaidesserts.list[id].Popular = req.body.Popular;
      thaidesserts.list[id].Price = req.body.Price;
      res.json(thaidesserts.list);
    })
    .delete((req, res) => {
      thaidesserts.list = thaidesserts.list.filter((item) => +item.id !== +req.params.thaidessertid);
      res.json(thaidesserts.list);
    });
  
  
  router.route("/purchase/:thaidessertId")
  .post((req,res) => {
    let id = thaidesserts.list.findIndex((item) => +item.id == +req.params.thaidessertId)
    if (id == -1) {
      res.json({message: "thaidessert not found"})
    }
    else {
      thaidesserts.list = thaidesserts.list.filter((item) => +item.id !== +req.params.thaidessertId);
      res.json(thaidesserts.list);
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