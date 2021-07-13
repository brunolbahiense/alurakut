import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

//isso não é um estilo, mas sim uma estrutura
function ProfileSidebar(props) {
  return(
    <Box>
      <img src= {`http://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`http://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const user = 'brunolbahiense'
  const [comunidades, setComunidades] = React.useState(['Aurakut'])
  //const comunidades = comunidades [0]
  //const alterarcomunidades/setcomunidades = comunidades [1]
  const pessoasFavoritas = [ 
    'omariosouto',
     'peas', 
     'rafaballerini',
     'felipefialho',
     'Roger-Melo', 
     'filipedeschamps'
    ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser = { user } />
        </div>

        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>
              Bem Vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(e) => {
              e.preventDefault()

              const comunidadesAtualizadas = [...comunidades, 'Alurakut Starts' ]
              setComunidades(comunidadesAtualizadas)
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"/>
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usar como capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usar como capa"/>
              </div>
              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>

        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <ul>
              {comunidades.map((item) => {
                return (
                  <li>
                    <a href={`/users/${item}`} key={item}>
                      <img src={`https://placehold.it/300x300`} />
                      <span>{item}</span>
                    </a>
                  </li>
                  
                ) 
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas Favoritas ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((item) => {
                return (
                  <li>
                    <a href={`/users/${item}`} key={item}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>

                    </a>
                  </li>
                  
                ) 
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
