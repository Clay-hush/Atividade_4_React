# Viva Tarefas 🌿

Projeto para o **Entregável 4 — Lifting State Up e `useEffect`**.

## O que a aplicação demonstra

- O componente pai `App` mantém o estado central da lista de tarefas.
- `Formulario` recebe `onAddTask` por props e envia novos dados ao pai.
- `Lista` recebe o array `tasks` e as funções de interação por props.
- Uma tarefa pode ser criada, concluída, reaberta e removida. Também há filtros e progresso.
- Um `useEffect` atualiza o título da aba conforme o número de tarefas pendentes.
- Outro `useEffect` inicia um timer com `setInterval` e o limpa com `clearInterval` no cleanup.

## Reflexão

### O que acontece se omitirmos o array de dependências do `useEffect`?

Se o segundo argumento for omitido, o efeito roda depois de cada renderização confirmada do componente. Quando esse efeito atualiza um estado que também provoca renderização, ele pode se repetir a cada atualização e até criar um ciclo. Com `[pendentes]`, por exemplo, o título só é atualizado quando a quantidade de tarefas pendentes muda. Com `[]`, o efeito é configurado para rodar na montagem (e ter seu cleanup executado ao desmontar, além do ciclo extra de verificação do Strict Mode em desenvolvimento).

### Como funciona o fluxo de dados no lifting state up?

Quando componentes irmãos precisam ler ou alterar os mesmos dados, o estado é movido para o ancestral comum mais próximo. O pai passa os dados para baixo por props — neste projeto, `App` passa `tasks` para `Lista` — e também passa funções para baixo. O filho chama a função recebida para comunicar uma ação de volta ao pai — `Formulario` chama `onAddTask`. O pai atualiza seu estado e React renderiza novamente os filhos com as props atualizadas. Assim, o pai é a fonte única de verdade e o fluxo fica previsível.
