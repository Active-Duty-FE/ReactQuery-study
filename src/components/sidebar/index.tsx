import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const Sidebar: FC<IProps> = memo(() => {
  return (
    <div className="w-[200px]">
      <NavLink className="block" to="/">
        Home
      </NavLink>
      <NavLink className="block" to="/list">
        List
      </NavLink>
    </div>
  )
})

export default Sidebar

Sidebar.displayName = 'Sidebar'
