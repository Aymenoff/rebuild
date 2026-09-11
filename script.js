"use strict";


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const body =
        document.body;

    const siteHeader =
        document.getElementById(
            "siteHeader"
        );

    const preloader =
        document.getElementById(
            "preloader"
        );

    const currentYear =
        document.getElementById(
            "currentYear"
        );

    const languageSwitch =
        document.getElementById(
            "languageSwitch"
        );

    const mobileMenuToggle =
        document.getElementById(
            "mobileMenuToggle"
        );

    const mobileNav =
        document.getElementById(
            "mobileNav"
        );

    const coachImageWrapper =
        document.getElementById(
            "coachImageWrapper"
        );


    /* =====================================================
       YEAR
       ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       PRELOADER
       ===================================================== */

    window.addEventListener(
        "load",
        () => {

            if (!preloader) {
                return;
            }

            setTimeout(
                () => {

                    preloader.style.opacity =
                        "0";

                    preloader.style.visibility =
                        "hidden";

                    preloader.style.pointerEvents =
                        "none";

                },
                400
            );

        }
    );


    /* =====================================================
       HEADER SCROLL
       ===================================================== */

    function updateHeader() {

        if (!siteHeader) {
            return;
        }

        if (window.scrollY > 40) {

            siteHeader.classList.add(
                "scrolled"
            );

        } else {

            siteHeader.classList.remove(
                "scrolled"
            );

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    if (
        mobileMenuToggle &&
        mobileNav
    ) {


        mobileMenuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileNav.classList.toggle(
                        "open"
                    );


                mobileMenuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                const icon =
                    mobileMenuToggle.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.classList.toggle(
                        "fa-bars",
                        !isOpen
                    );

                    icon.classList.toggle(
                        "fa-xmark",
                        isOpen
                    );

                }

            }
        );


        /* CLOSE AFTER LINK */

        mobileNav
            .querySelectorAll("a")
            .forEach(
                link => {

                    link.addEventListener(
                        "click",
                        () => {

                            mobileNav.classList.remove(
                                "open"
                            );

                            mobileMenuToggle.setAttribute(
                                "aria-expanded",
                                "false"
                            );


                            const icon =
                                mobileMenuToggle.querySelector(
                                    "i"
                                );


                            if (icon) {

                                icon.classList.remove(
                                    "fa-xmark"
                                );

                                icon.classList.add(
                                    "fa-bars"
                                );

                            }

                        }
                    );

                }
            );


        /* CLOSE OUTSIDE */

        document.addEventListener(
            "click",
            event => {

                if (
                    !mobileNav.contains(
                        event.target
                    ) &&
                    !mobileMenuToggle.contains(
                        event.target
                    )
                ) {

                    mobileNav.classList.remove(
                        "open"
                    );

                    mobileMenuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }


    /* =====================================================
       LANGUAGE
       ===================================================== */

    const savedLanguage =
        localStorage.getItem(
            "rebuild-language"
        ) || "ar";


    function applyLanguage(language) {


        const bilingualElements =
            document.querySelectorAll(
                "[data-ar][data-fr]"
            );


        bilingualElements.forEach(
            element => {

                const arabic =
                    element.getAttribute(
                        "data-ar"
                    );

                const french =
                    element.getAttribute(
                        "data-fr"
                    );


                if (
                    language === "fr"
                ) {

                    element.textContent =
                        french;

                } else {

                    element.textContent =
                        arabic;

                }

            }
        );


        /* HTML */

        document.documentElement
            .setAttribute(
                "lang",
                language
            );


        document.documentElement
            .setAttribute(
                "dir",
                language === "ar"
                    ? "rtl"
                    : "ltr"
            );


        body.classList.toggle(
            "lang-ar",
            language === "ar"
        );

        body.classList.toggle(
            "lang-fr",
            language === "fr"
        );


        /* BUTTONS */

        if (languageSwitch) {

            languageSwitch
                .querySelectorAll(
                    "[data-language]"
                )
                .forEach(
                    button => {

                        const buttonLanguage =
                            button.getAttribute(
                                "data-language"
                            );


                        const active =
                            buttonLanguage ===
                            language;


                        button.classList.toggle(
                            "active",
                            active
                        );


                        button.setAttribute(
                            "aria-pressed",
                            String(active)
                        );

                    }
                );

        }


        localStorage.setItem(
            "rebuild-language",
            language
        );

    }


    applyLanguage(
        savedLanguage
    );


    if (languageSwitch) {

        languageSwitch
            .querySelectorAll(
                "[data-language]"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const language =
                                button.getAttribute(
                                    "data-language"
                                );


                            if (!language) {
                                return;
                            }


                            applyLanguage(
                                language
                            );

                        }
                    );

                }
            );

    }


    /* =====================================================
       REVEAL ANIMATION
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window
    ) {


        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target
                                .classList
                                .add(
                                    "visible"
                                );


                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }
                    );

                },
                {
                    threshold: .10,

                    rootMargin:
                        "0px 0px -35px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );


    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       STAGGER ANIMATION
       ===================================================== */

    const staggerGroups = [
        ".coaching-card",
        ".method-step",
        ".contact-card",
        ".philosophy-item"
    ];


    staggerGroups.forEach(
        selector => {

            document
                .querySelectorAll(
                    selector
                )
                .forEach(
                    (element, index) => {

                        element.style.transitionDelay =
                            `${index * 70}ms`;

                    }
                );

        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const navLinks =
        document.querySelectorAll(
            '.nav-link[href^="#"]'
        );

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    function updateActiveNavigation() {

        let currentSection = "";


        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(
            section => {

                const top =
                    section.offsetTop;

                const height =
                    section.offsetHeight;


                if (
                    scrollPosition >= top &&
                    scrollPosition <
                        top + height
                ) {

                    currentSection =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            link => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                link.classList.toggle(
                    "active",
                    href ===
                        `#${currentSection}`
                );

            }
        );

    }


    updateActiveNavigation();


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        const headerHeight =
                            siteHeader
                                ? siteHeader.offsetHeight
                                : 0;


                        const position =
                            target
                                .getBoundingClientRect()
                                .top +
                            window.scrollY -
                            headerHeight -
                            20;


                        window.scrollTo(
                            {
                                top: position,

                                behavior:
                                    "smooth"
                            }
                        );

                    }
                );

            }
        );


    /* =====================================================
       DESKTOP DETECTION
       ===================================================== */

    const supportsHover =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    /* =====================================================
       COACH IMAGE 3D
       ===================================================== */

    if (
        coachImageWrapper &&
        supportsHover
    ) {


        coachImageWrapper.addEventListener(
            "mousemove",
            event => {

                const rect =
                    coachImageWrapper
                        .getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    7;


                const rotateX =
                    ((centerY - y) /
                        centerY) *
                    7;


                coachImageWrapper.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.015)
                    `;

            }
        );


        coachImageWrapper.addEventListener(
            "mouseleave",
            () => {

                coachImageWrapper.style.transform =
                    `
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    scale(1)
                    `;

            }
        );

    }


    /* =====================================================
       CARD TILT
       ONLY DESKTOP
       ===================================================== */

    if (supportsHover) {

        document
            .querySelectorAll(
                ".coaching-card"
            )
            .forEach(
                card => {


                    card.addEventListener(
                        "mousemove",
                        event => {

                            const rect =
                                card.getBoundingClientRect();


                            const x =
                                event.clientX -
                                rect.left;


                            const y =
                                event.clientY -
                                rect.top;


                            const rotateY =
                                ((x -
                                    rect.width / 2) /
                                    rect.width) *
                                3;


                            const rotateX =
                                ((rect.height / 2 -
                                    y) /
                                    rect.height) *
                                3;


                            card.style.transform =
                                `
                                perspective(900px)
                                rotateX(${rotateX}deg)
                                rotateY(${rotateY}deg)
                                translateY(-8px)
                                `;

                        }
                    );


                    card.addEventListener(
                        "mouseleave",
                        () => {

                            card.style.transform =
                                "";

                        }
                    );

                }
            );

    }


    /* =====================================================
       ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            if (mobileNav) {

                mobileNav.classList.remove(
                    "open"
                );

            }


            if (mobileMenuToggle) {

                mobileMenuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            if (coachImageWrapper) {

                coachImageWrapper.style.transform =
                    "";

            }

        }
    );


    /* =====================================================
       RESIZE
       ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {


                        if (
                            window.innerWidth > 900 &&
                            mobileNav
                        ) {

                            mobileNav.classList.remove(
                                "open"
                            );

                        }


                        if (
                            window.innerWidth <= 900 &&
                            coachImageWrapper
                        ) {

                            coachImageWrapper.style.transform =
                                "";

                        }

                    },
                    150
                );

        }
    );


    /* =====================================================
       PAGE READY
       ===================================================== */

    body.classList.add(
        "js-loaded"
    );

});