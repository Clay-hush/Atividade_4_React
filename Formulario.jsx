import { useState } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'

export default function Formulario({ onAddTask }) {
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Pessoal')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const cleanDescription = description.trim()
    if (!cleanDescription) {
      setError('Escreva uma tarefa antes de adicionar.')
      return
    }
    onAddTask({ description: cleanDescription, category })
    setDescription('')
    setError('')
    event.currentTarget?.querySelector('input')?.focus()
  }

  return (
    <section className="rounded-[26px] border border-[#e8ebe4] bg-white p-5 shadow-[0_10px_35px_#24342308] sm:p-6" aria-labelledby="form-title">
      <div className="flex items-start justify-between gap-4">
        <div><p className="eyebrow">TIRE DA CABEÇA</p><h2 id="form-title" className="mt-1 text-xl font-semibold tracking-[-.045em]">Uma coisa de cada vez.</h2></div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#eef1e9] text-[#52644e]"><ArrowUpRight size={19} /></span>
      </div>
      <form className="mt-6" onSubmit={handleSubmit}>
        <label htmlFor="task-description" className="mb-2 block text-xs font-semibold text-[#667162]">O que você quer fazer?</label>
        <input id="task-description" value={description} onChange={(event) => { setDescription(event.target.value); if (error) setError('') }} placeholder="Ex.: revisar o projeto de React" className={`w-full rounded-xl border bg-[#fbfcf9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#a9b0a5] focus:border-[#809174] focus:bg-white ${error ? 'border-red-400' : 'border-[#e6eae1]'}`} aria-invalid={Boolean(error)} aria-describedby={error ? 'task-error' : 'task-hint'} />
        {error ? <p id="task-error" className="mt-2 text-xs font-medium text-red-600">{error}</p> : <p id="task-hint" className="mt-2 text-xs text-[#969e91]">Comece com um verbo. Fica mais fácil.</p>}
        <div className="mt-5"><label htmlFor="task-category" className="mb-2 block text-xs font-semibold text-[#667162]">Área</label><select id="task-category" value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-xl border border-[#e6eae1] bg-[#fbfcf9] px-4 py-3 text-sm text-[#394238] outline-none focus:border-[#809174]"><option>Pessoal</option><option>Trabalho</option><option>Estudos</option></select></div>
        <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#294332] py-3.5 text-sm font-semibold text-white transition hover:bg-[#1e3627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#294332]"><Plus size={17} /> Adicionar tarefa</button>
      </form>
    </section>
  )
}
