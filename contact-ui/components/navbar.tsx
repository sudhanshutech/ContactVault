"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, Logo } from "@/components/icons";


export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showlogin, setShowLogin] = useState(false);
  const [showsignUp, setShowSignUp] = useState(false);

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if (token) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  };

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      setShowLogin(false);
      setShowSignUp(false);
    } else {
      setIsLoggedIn(false);
      setShowLogin(true);
      setShowSignUp(true);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden sm:flex gap-4 justify-start ml-2">
          {isLoggedIn ? (
            <>
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium"
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
            </>
          ) : (
            <>
              {siteConfig.navItems
                .filter((item) => item.auth === false)
                .map((item) => (
                  <NavbarItem key={item.href}>
                    <NextLink
                      className={clsx(
                        linkStyles({ color: "foreground" }),
                        "data-[active=true]:text-primary data-[active=true]:font-medium"
                      )}
                      color="foreground"
                      href={item.href}
                    >
                      {item.label}
                    </NextLink>
                  </NavbarItem>
                ))}
            </>
          )}
        </ul>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
      <NavbarContent justify="end" />
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {isLoggedIn && (
          <NavbarItem>
            <Button color="danger" onClick={handleLogout}>
              Logout
            </Button>
          </NavbarItem>
        )}
        {showlogin && (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login"> Login </Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
      </NavbarContent>
    </NextUINavbar>
  );
};
