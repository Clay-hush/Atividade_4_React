import { Check, Circle, ListTodo, Trash2 } from 'lucide-react'

const categoryStyles = {
  Pessoal: 'bg-[#f6eadc] text-[#9c7046]',
  Trabalho: 'bg-[#e8edf5] text-[#5e7697]',
  Estudos: 'bg-[#eee8f5] text-[#80679a]',
}

export default function Lista({ tasks, filter, onToggleTask, onDeleteTask }) {
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'pendentes') return !task.completed
    if (filter === 'concluidas') return task.completed
    return true
  })

  if (visibleTasks.length === 0) {
    const emptyTitle = tasks.length === 0 ? 'Tudo começa com uma tarefa.' : 'Nada por aqui ainda.'
    const emptyDescription = tasks.length === 0 ? 'Anote uma coisa pequena para dar o primeiro passo.' : 'Tente outro filtro ou adicione uma nova tarefa.'
    return <div className="grid min-h-64 place-items-center rounded-[26px] border border-dashed border-[#dfe4db] bg-white/60 px-6 py-10 text-center"><div><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#edf1e9] text-[#667c5e]"><ListTodo size={22} /></span><h3 className="mt-4 text-sm font-semibold">{emptyTitle}</h3><p className="mx-auto mt-1 max-w-60 text-xs leading-5 text-[#899286]">{emptyDescription}</p></div></div>
  }

  return (
    <ul className="divide-y divide-[#edf0e9] overflow-hidden rounded-[24px] border border-[#e8ebe4] bg-white">
      {visibleTasks.map((task) => (
        <li key={task.id} className={`group flex items-center gap-3.5 px-4 py-4 transition hover:bg-[#fcfdfa] sm:px-5 ${task.completed ? 'opacity-65' : ''}`}>
          <button onClick={() => onToggleTask(task.id)} className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition ${task.completed ? 'border-[#587651] bg-[#587651] text-white' : 'border-[#cdd5c8] text-transparent hover:border-[#587651] hover:text-[#587651]'}`} aria-label={task.completed ? `Marcar ${task.description} como pendente` : `Concluir ${task.description}`} aria-pressed={task.completed}>{task.completed ? <Check size={14} strokeWidth={3} /> : <Circle size={8} fill="currentColor" />}</button>
          <div className="min-w-0 flex-1"><p className={`break-words text-sm font-medium ${task.completed ? 'text-[#969e92] line-through' : 'text-[#354033]'}`}>{task.description}</p><span className={`mt-1.5 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${categoryStyles[task.category]}`}>{task.category}</span></div>
          <button onClick={() => onDeleteTask(task.id)} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[#abb2a7] opacity-100 transition hover:bg-[#fbefed] hover:text-[#b56558] sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100" aria-label={`Excluir ${task.description}`}><Trash2 size={16} /></button>
        </li>
      ))}
    </ul>
  )
}
