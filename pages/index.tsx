import { GetServerSideProps } from "next"
import { useState } from 'react'
import { prisma } from "../lib/prisma";
import { useRouter } from "next/router";

interface FormData {
  title: string
  content: string
  id: string
}

interface Notes {
  notes: {
    id: string
    title: string
    content: string
  }[]
}

export default function Home({ notes }: Notes) {

  const [form, setForm] = useState<FormData>({ title: '', content: '', id: '' })

  async function create(data: FormData) {
    if (data.id) {

      try {
        fetch(`http://localhost:3000/api/update/${data.id}`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }).then(() => {
          setForm({ title: '', content: '', id: '' })
          refreshData()
        })
      } catch (error) {
        console.log(error);
      }

    } else {

      try {
        fetch('http://localhost:3000/api/create', {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }).then(() => {
          setForm({ title: '', content: '', id: '' })
          refreshData()
        })
      } catch (error) {
        console.log(error);
      }

    }

  }

  async function deleteNote(id: string) {
    try {
      fetch(`http://localhost:3000/api/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'DELETE'
      }).then(() => {
        refreshData()
      })
    } catch (error) {
      console.log(error);
    }
  }

  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const handleSubmit = async (data: FormData) => {
    try {
      create(data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-3 mb-0 p-7">Lista de Tarefas</h1>
      <form onSubmit={e => {
        e.preventDefault()
        handleSubmit(form)
      }} className='w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch'>
        <input type="text"
          placeholder="Título"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />
        <textarea
          placeholder="Tarefa"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-1">Salvar</button>
      </form>
      <div className="w-auto min-w-[25%] max-w-min mt-10 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {notes.map(note => (
            <li key={note.id} className="border-b border-gray-600 p-2">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="font-bold">{note.title}</h3>
                  <p className="text-sm">{note.content}</p>
                </div>
                <button onClick={() => setForm({ title: note.title, content: note.content, id: note.id })} className="bg-blue-500 mr-3 px-3 text-white rounded">Editar</button>
                <button onClick={() => deleteNote(note.id)} className="bg-red-500 px-3 text-white rounded">X</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({
    select: {
      title: true,
      id: true,
      content: true
    }
  })

  return {
    props: {
      notes
    }
  }
}