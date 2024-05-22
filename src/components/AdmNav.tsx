import {Nav} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
export function AdmNav() {

    const navigate = useNavigate()
    const {t} = useTranslation('common')

    return (
    <Nav
      activeKey="/users"
      onSelect={(selectedKey) => navigate(selectedKey)}
    >
      <Nav.Item>
        <Nav.Link eventKey="/users">{t('navAdm.users')}</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/patients">{t('navAdm.patients')}</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link eventKey="/manifests">{t('navAdm.manifests')}</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link eventKey="/notes">{t('navAdm.notes')}</Nav.Link>
      </Nav.Item>

    </Nav>
  )
}
