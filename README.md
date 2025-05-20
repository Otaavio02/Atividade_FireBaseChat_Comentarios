## - chatList.js
# Boas práticas:
- Uso de componente funcional com sintaxe moderna
- Componentização com "ChatItem" para melhor separação de responsabilidades
- Uso adequado de "FlatList" para desempenho
- Estilização com NativeWind ("className')
- Navegação desacoplada com "useRouter" do Expo

# Sugestão de melhoria:
- Evitar o uso de `Math.random()` como `keyExtractor`; isso causa re-renderizações desnecessárias
- Adicionar verificação de tipo (PropTypes ou TypeScript)
- Encapsular lógicas como `noBorder` em funções auxiliares para clareza
- Remover imports não utilizados (ex: `Text`)]

  
