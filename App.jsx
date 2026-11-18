import { useEffect, useMemo, useState } from 'react'
import { CheckCheck, Clock3, Leaf, ListFilter, RotateCcw, Sparkles } from 'lucide-react'
import Formulario from './Formulario.jsx'
import Lista from './Lista.jsx'

const filters = [
  { id: 'todas', label: 'Todas' },
  { id: 'pendentes', label: 'Pendentes' },
  { id: 'concluidas', label: 'Concluídas' },
]

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remainingSeconds}`
}

export default function App() {
  // Estado elevado: App é a fonte única de verdade para todos os componentes de tarefas.
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('todas')
  const [secondsOpen, setSecondsOpen] = useState(0)

  const pendingCount = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks])
  const completedCount = tasks.length - pendingCount
  const progress = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100)

  // Efeito colateral: mantém o título da aba sincronizado com as tarefas pendentes.
  useEffect(() => {
    document.title = `${pendingCount} ${pendingCount === 1 ? 'tarefa pendente' : 'tarefas pendentes'} | Viva Tarefas`
  }, [pendingCount])

  // Timer da atividade: intervalo criado uma vez e limpo quando App desmontar.
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSecondsOpen((currentSeconds) => currentSeconds + 1)
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  function addTask({ description, category }) {
    const task = { id: crypto.randomUUID(), description, category, completed: false }
    setTasks((currentTasks) => [task, ...currentTasks])
    setFilter('todas')
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) => currentTasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task))
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  function clearCompleted() {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed))
  }

  return (
    <div className="min-h-screen bg-[#f5f6f2] text-[#253126]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#inicio" className="flex items-center gap-2.5" aria-label="Viva Tarefas, início"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#294332] text-white"><Leaf size={20} /></span><span className="text-lg font-extrabold tracking-[-.07em]">viva<span className="font-medium text-[#87947e]">tarefas</span><span className="text-[#db8d65]">.</span></span></a>
        <div className="flex items-center gap-2 rounded-full border border-[#e5e9e1] bg-white px-3.5 py-2 text-xs font-medium text-[#687365]"><Clock3 size={14} className="text-[#809174]" /><span>Foco há {formatTime(secondsOpen)}</span></div>
      </header>

      <main id="inicio" className="mx-auto max-w-6xl px-5 pb-14 pt-8 sm:px-8 sm:pt-12">
        <section className="relative overflow-hidden rounded-[30px] bg-[#294332] px-6 py-8 text-white sm:px-10 sm:py-10">
          <div className="absolute -right-12 -top-24 h-64 w-64 rounded-full border border-white/10" /><div className="absolute -right-1 -top-12 h-44 w-44 rounded-full border border-white/10" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_220px] md:items-end"><div><div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#d2dfc9]"><Sparkles size={13} /> Seu espaço de foco</div><h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-.065em] sm:text-5xl">Menos na cabeça.<br /><span className="serif-italic text-[#eab18b]">Mais no seu dia.</span></h1><p className="mt-3 max-w-md text-sm leading-6 text-[#d0dbcf]">Organize as prioridades com calma. Um passo concluído já é progresso.</p></div>
            <div className="rounded-[22px] border border-white/15 bg-white/[.08] p-5 backdrop-blur-sm"><div className="flex items-center justify-between text-xs text-[#d0dbcf]"><span>Seu progresso</span><CheckCheck size={16} /></div><div className="mt-3 flex items-end justify-between"><strong className="text-4xl font-semibold tracking-[-.06em]">{progress}<span className="ml-0.5 text-xl text-[#b9c9b3]">%</span></strong><span className="pb-1 text-xs text-[#d0dbcf]">{completedCount} de {tasks.length} feitas</span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-[#dfad83] transition-all duration-500" style={{ width: `${progress}%` }} /></div></div>
          </div>
        </section>

        <section className="mt-7 grid items-start gap-6 lg:grid-cols-[.77fr_1.23fr]">
          <div className="lg:sticky lg:top-6"><Formulario onAddTask={addTask} /><div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#e9eee5] p-4 text-[#60715b]"><span className="mt-0.5"><Sparkles size={16} /></span><p className="text-xs leading-5">Dica: transformar uma tarefa grande em passos menores ajuda a começar.</p></div></div>
          <div>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">NO SEU RITMO</p><h2 className="mt-1 text-2xl font-semibold tracking-[-.05em]">Sua lista <span className="text-[#9ca599]">({tasks.length})</span></h2></div>{completedCount > 0 && <button onClick={clearCompleted} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-[#7b8676] transition hover:bg-white hover:text-[#344d38]"><RotateCcw size={13} /> Limpar concluídas</button>}</div>
            <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1" aria-label="Filtrar tarefas">{filters.map((option) => <button key={option.id} onClick={() => setFilter(option.id)} aria-pressed={filter === option.id} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${filter === option.id ? 'bg-[#354c39] text-white' : 'bg-white text-[#7d8779] hover:text-[#354c39]'}`}>{option.label}{option.id === 'pendentes' && <span className={`ml-1.5 ${filter === option.id ? 'text-[#c8d5c2]' : 'text-[#a7aea3]'}`}>{pendingCount}</span>}</button>)}</div>
            <Lista tasks={tasks} filter={filter} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
            <p className="mt-3 flex items-center gap-1.5 px-1 text-[10px] text-[#9aa295]"><ListFilter size={12} /> Os dados ficam nesta sessão e são reiniciados ao atualizar a página.</p>
          </div>
        </section>

        <section className="mt-12 rounded-[24px] border border-[#e4e9df] bg-white/70 px-5 py-5 sm:flex sm:items-center sm:justify-between"><div><span className="eyebrow">EXERCÍCIO DE ARQUITETURA</span><h2 className="mt-1 text-base font-semibold">Dados para baixo. Ações para cima.</h2><p className="mt-1 max-w-2xl text-xs leading-5 text-[#7d8779]">O estado mora no componente pai <code className="rounded bg-[#edf1e9] px-1 py-0.5 text-[#52644e]">App</code>. O formulário recebe <code className="rounded bg-[#edf1e9] px-1 py-0.5 text-[#52644e]">onAddTask</code> e envia eventos para cima; a lista recebe <code className="rounded bg-[#edf1e9] px-1 py-0.5 text-[#52644e]">tasks</code> e mostra os dados abaixo.</p></div><div className="mt-4 shrink-0 rounded-xl bg-[#edf1e9] px-3 py-2 text-xs font-medium text-[#60715b] sm:mt-0">useEffect + cleanup ✓</div></section>
      </main>
      <footer className="mx-auto flex max-w-6xl justify-between px-5 pb-7 text-[10px] text-[#9aa295] sm:px-8"><span>© 2026 Viva Tarefas</span><span>Feito com foco e React.</span></footer>
    </div>
  )
}
