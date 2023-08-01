export class GithubUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint).then(data => data.json())
    .then(({ login, name, public_repos, followers }) => ({
      login,
      name,
      public_repos,
      followers
    }))
  }
}


// classe qe vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()

    GithubUser.search('andreliciosantos').then(user => console.log(user))
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username) {
    try {
      const user = await GithubUser.search(username)
      console.log(user)

      if(user.login === undefined) {
        throw new Error('User not found')
      }

      this.entries = [...this.entries, user]
      this.update()
      this.save()
      
    } catch(error){
      alert(error.message)
    }
  }

  delete(user) {
    // Higher-order function -> filter
    this.entries = this.entries.filter(entry => entry.login !== user.login)
    this.update()
    this.save()
  }
}

// classe que vai criar a visualização de eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root){
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
    this.onAdd()
  }

  onAdd() {
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')
      this.add(value)
    }
  }

  update() {
    this.removeAllTr()

    this.entries.forEach( user => {
      const row = this.createRow()
      
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Foto de perfil de ${user.name}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOK = confirm('Tem certeza que deseja desfavoritar essa pessoa?')
        if(isOK){
          this.delete(user)
        }
      }
      this.tbody.append(row)
    })
    this.checkIfPageEmpty() 
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/andreliciosantos.png" alt="Foto de perfil de Andrelicio Santos">
        <a target="_blank" href="https://github.com/andreliciosantos">
          <p>Andrelicio Santos</p>
          <span>/andreliciosantos</span>
        </a>
      </td>
      <td class="repositories">
        00
      </td>
      <td class="followers">
        0000
      </td>
      <td>
        <button class="remove">Remover</button>
      </td>
    ` 
    return tr
  }

  checkIfPageEmpty() {
    const emptyPage = document.createElement('tr')
      emptyPage.innerHTML = `
        <td class="emptyState">
          <img src="/assets/cartoonStar.svg" alt="">
          Nenhum favorito ainda
        </td>
        <td class="emptyStateHeight">
        </td>
        <td class="Followers">
        </td>
        <td>
        </td>
      `
    const checkIfHaveEntries = this.entries.length
    
    if(checkIfHaveEntries == 0){
      this.tbody.append(emptyPage)
    }
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr')
    .forEach((tr) => {
      tr.remove()
    })
  }
}