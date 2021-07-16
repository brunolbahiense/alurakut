import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

//isso não é um estilo, mas sim uma estrutura
function ProfileSidebar(props) {
  return(
    <Box as="aside">
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

function ProfileRelationsBox (props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {/* {seguidores.map((item) => {
          return (
            <li key={item}>
              <a href={`https://github.com/${item}.png`} key={item.title}>
                <img src={item.image} />
                <span>{item.title}</span>
              </a>
            </li>      
           ) 
        })} */}
      </ul>
      </ProfileRelationsBoxWrapper>
  )
}
export default function Home() {
  const user = 'brunolbahiense'
  const [comunidades, setComunidades] = React.useState([])
  //const comunidades = comunidades [0]
  //const alterarcomunidades/setcomunidades = comunidades [1]
  const pessoasFavoritas = [ 

     'peas', 
     'rafaballerini',
     'felipefialho',
     'Roger-Melo', 
     'filipedeschamps',
     'omariosouto'
    ]
    const [seguidores, setSeguidores] = React.useState([])
    React.useEffect(() => {
      fetch('https://api.github.com/users/brunolbahiense/followers')
        .then((resposta) => {
          return resposta.json()
        })
        .then((respostaCompleta) => {
          setSeguidores(respostaCompleta)
        })
        
      //API GRAPHQL
      fetch( 'https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': 'b6859c9000f5489f37c289c9b84811',
          'Content-Type': 'application/json',
          'Accept': 'application/json',    
        },
        body: JSON.stringify({ "query": `        
        {
          allCommunities {
            title
            id
            imageUrl
            creatorSlug
          }
        }`})
      })
      .then((response) => response.json())
      .then((respostaCompleta) => {
        const comunidadesDato = respostaCompleta.data.allCommunities
        setComunidades(comunidadesDato)
      })
    }, [])

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
              const dadosDoForm = new FormData(e.target)

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: user
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
              })
              .then(async (res) => {
                const data = await res.json()
                console.log(data)
                const comunidade = dados.registroCriado
                const comunidadesAtualizadas = [...comunidades, comunidade ]
                setComunidades(comunidadesAtualizadas)
              })
              
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
          <ProfileRelationsBox title='Seguidores' items={seguidores}/>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/communities/${item.title}`} key={item.title}>
                      <img src={item.imageUrl} />
                      <span>{item.title}</span>
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
                  <li key={item}>
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
