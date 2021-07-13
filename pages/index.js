import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

//isso não é um estilo, mas sim uma estrutura
function ProfileSidebar(props) {
  return(
    <Box>
      <img src= {`http://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {

  const user = 'brunolbahiense'
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
        </div>

        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
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
