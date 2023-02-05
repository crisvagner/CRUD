import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { title, content } = req.body
    const noteId = req.query.id

    try {
        await prisma.note.update({
            where: {
                id: Number(noteId)
            },
            data: {
                title,
                content
            }
        })
        res.status(200).json({ message: 'Tarefa atualizada com sucesso!' })
    } catch (error) {
        console.log("Falha ao tentar atualizar a Tarefa. Tente novamente.");
    }
}