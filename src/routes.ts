import { Router } from "express";
import { Prisma } from "./utils";

export const routes = Router();


//GET ALL POST
routes.get("/", async (req, res) => {
    const posts = await Prisma.post.findMany();
    return res.json(posts);
});

//GET ONE POST
routes.get("/:id", async (req, res) => {
    const { id } = req.params;
    const postExisted = await Prisma.post.findFirst({ where: { id: id } });

    if (!postExisted) {
        return res.sendStatus(400);
    }
    return res.json(postExisted);
});

//CREATE POST
routes.post("/", async (req, res) => {
    const { content, title } = req.body;
    if (!content || !title) {
        return res.json("campo com valor invalido")
    }
    await Prisma.post.create({
        data: {
            title,
            content
        }
    });
    return res.sendStatus(201);
});


//DELETE POST
routes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const postExisted = await Prisma.post.findFirst({ where: { id: id } });

    if (!postExisted) {
        return res.sendStatus(400);
    }

    await Prisma.post.delete({ where: { id: id } });
    return res.sendStatus(200);
});

//UPDATE POST
routes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const postExisted = await Prisma.post.findFirst({ where: { id: id } });

    if (!postExisted) {
        return res.sendStatus(400);
    }

    if (!content || !title) {
        return res.json("campo com valor invalido")
    }

    await Prisma.post.update({
        data: { content, title },
        where: { id: id }
    });

    return res.sendStatus(200)
})