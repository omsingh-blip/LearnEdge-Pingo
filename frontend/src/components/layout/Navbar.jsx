import { useState } from "react";

import {
  NavLink,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  LayoutDashboard,
  Code2,
  CalendarDays,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useAuthStore } from "../../store/authStore";

export default function Navbar() {

  const { logout } =
    useAuthStore();

  const [mobileOpen,
    setMobileOpen] =
    useState(false);

  const navClass = ({
    isActive,
  }) =>
    `
    px-4 py-2 rounded-xl
    transition-all duration-300
    flex items-center gap-2
    text-sm md:text-base

    ${
      isActive
        ? "bg-blue-500/20 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        : "text-gray-300 hover:text-white hover:bg-white/5"
    }
  `;

  return (
    <motion.nav

      initial={{
        y: -40,
        opacity: 0,
      }}

      animate={{
        y: 0,
        opacity: 1,
      }}

      className="
        fixed top-0 left-0
        w-full z-50
        px-4 md:px-8 py-4
      "
    >

      <div
        className="
          max-w-7xl mx-auto

          bg-slate-900/70
          backdrop-blur-xl

          border border-slate-700
          rounded-2xl

          px-4 md:px-8 py-4

          shadow-[0_0_40px_rgba(59,130,246,0.15)]
        "
      >

        <div
          className="
            flex items-center
            justify-between
          "
        >

          {/* Logo */}
          <div
            className="
              flex items-center gap-3
            "
          >

            <img
              src="/companyLogo.png"
              alt="LearnEdge"

              className="
                w-10 h-10 rounded-full
                shadow-[0_0_15px_rgba(59,130,246,0.5)]
              "
            />

            <h1
              className="
                text-xl md:text-2xl
                font-bold tracking-wide
              "
            >
              LearnEdge
            </h1>

          </div>

          {/* Desktop Nav */}
          <div
            className="
              hidden md:flex
              items-center gap-4
            "
          >

            <NavLink
              to="/dashboard"
              className={navClass}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink
              to="/practice"
              className={navClass}
            >
              <Code2 size={18} />
              Practice
            </NavLink>

            <NavLink
              to="/prep-planner"
              className={navClass}
            >
              <CalendarDays size={18} />
              Planner
            </NavLink>

            <button
              onClick={logout}

              className="
                px-4 py-2 rounded-xl

                flex items-center gap-2

                text-red-300

                hover:bg-red-500/10
                hover:text-red-200

                transition-all duration-300
              "
            >

              <LogOut size={18} />

              Logout

            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }

            className="
              md:hidden
              p-2 rounded-lg
              hover:bg-white/5
            "
          >

            {mobileOpen
              ? <X />
              : <Menu />}

          </button>

        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (

          <div
            className="
              md:hidden

              mt-4 pt-4

              border-t border-slate-700

              flex flex-col gap-3
            "
          >

            <NavLink
              to="/dashboard"
              className={navClass}

              onClick={() =>
                setMobileOpen(false)
              }
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink
              to="/practice"
              className={navClass}

              onClick={() =>
                setMobileOpen(false)
              }
            >
              <Code2 size={18} />
              Practice
            </NavLink>

            <NavLink
              to="/prep-planner"
              className={navClass}

              onClick={() =>
                setMobileOpen(false)
              }
            >
              <CalendarDays size={18} />
              Planner
            </NavLink>

            <button
              onClick={() => {

                logout();

                setMobileOpen(false);

              }}

              className="
                px-4 py-2 rounded-xl

                flex items-center gap-2

                text-red-300

                hover:bg-red-500/10

                transition-all duration-300
              "
            >

              <LogOut size={18} />

              Logout

            </button>

          </div>

        )}

      </div>

    </motion.nav>
  );
}