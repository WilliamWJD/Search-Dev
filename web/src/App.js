import React, {useEffect, useState} from 'react'
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

function App() {
  const [github_username, setGithub_username]=useState('')
  const [techs, setTechs]=useState('')

  const [latitude, setLatitude]=useState('')
  const [longitude, setlongitude]=useState('')

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        const {latitude, longitude}=position.coords

        setLatitude(latitude)
        setlongitude(longitude)
      },
      (err)=>{
        console.log(err)
      },
      {
        timeout:30000,
      }
    )
  },[])

  async function handleAddDev(e){
    e.preventDefault();
    const response=await api.post('/devs',{
      github_username, techs, latitude, longitude
    })
    setGithub_username('')
    setTechs('')
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" value={github_username} onChange={e=>setGithub_username(e.target.value)} required />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              value={techs} 
              onChange={e=>setTechs(e.target.value)} 
              required 
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required 
                value={latitude} 
                onChange={e=> setLatitude(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number" 
                name="longitude"
                id="longitude" 
                required  
                value={longitude} 
                onChange={e=> setlongitude(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>

      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/31516475?s=460&v=4" alt="William José Dias"/>
              <div className="user-info">
                <strong>William José Dias</strong>
                <span>ReactJS, Reac Native, NodeJS, Java</span>
              </div>
            </header>
            <p>CTO na @Wjd Solutions, um amante e entusiasta por técnologias e programação.</p>
            <a href="https://github.com/williamwjd">Acessar perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/31516475?s=460&v=4" alt="William José Dias"/>
              <div className="user-info">
                <strong>William José Dias</strong>
                <span>ReactJS, Reac Native, NodeJS, Java</span>
              </div>
            </header>
            <p>CTO na @Wjd Solutions, um amante e entusiasta por técnologias e programação.</p>
            <a href="https://github.com/williamwjd">Acessar perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/31516475?s=460&v=4" alt="William José Dias"/>
              <div className="user-info">
                <strong>William José Dias</strong>
                <span>ReactJS, Reac Native, NodeJS, Java</span>
              </div>
            </header>
            <p>CTO na @Wjd Solutions, um amante e entusiasta por técnologias e programação.</p>
            <a href="https://github.com/williamwjd">Acessar perfil no Github</a>
          </li>
        </ul>
      </main>
    </div>
  )
}

export default App
