import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { title, content } = req.body

    try {
        await prisma.note.create({
            data: {
                title,
                content
            }
        })
        res.status(200).json({ message: 'Tarefa criada com sucesso!' })
    } catch (error) {
        console.log("Falha ao tentar salvar a Tarefa. Tente novamente.");
    }
}