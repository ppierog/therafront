import { Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import React from 'react'

type ActiveTab = "/users" | "/patients" | "/manifests" | "/notes"

interface AdminNavProps {
  activeKey: ActiveTab
}

export function AdmNav(props: AdminNavProps) {

  const navigate = useNavigate()
  const { t } = useTranslation('common')

  return (
    <Nav
      variant="pills"
      activeKey={props.activeKey ?? "/users"}
      onSelect={selectedKey => navigate(selectedKey)}
    >
      <Nav.Item key="/users">
        <Nav.Link eventKey="/users">{t('navAdm.users')}</Nav.Link>
      </Nav.Item>
      <Nav.Item key="/patients">
        <Nav.Link eventKey="/patients">{t('navAdm.patients')}</Nav.Link>
      </Nav.Item>

      <Nav.Item key="/manifests">
        <Nav.Link eventKey="/manifests">{t('navAdm.manifests')}</Nav.Link>
      </Nav.Item>

      <Nav.Item key="/notes">
        <Nav.Link eventKey="/notes">{t('navAdm.notes')}</Nav.Link>
      </Nav.Item>

    </Nav>
  )
}
