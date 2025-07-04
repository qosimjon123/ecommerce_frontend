export const handlers = {
  cartClickHandler(event: Event): void {
    event.preventDefault()

    document.body.style.overflow = 'hidden'

    const cartSidebar = document.querySelector('.cart-sidebar') as HTMLElement
    if (cartSidebar) {
      cartSidebar.classList.add('active')
    }

    const backdrop = document.querySelector('.backdrop') as HTMLElement
    if (backdrop) {
      backdrop.style.display = 'block'
    }

    const cartClose = document.querySelector('.cart-close') as HTMLElement
    if (cartClose) {
      cartClose.addEventListener(
        'click',
        () => {
          document.body.style.overflow = 'inherit'
          if (cartSidebar) {
            cartSidebar.classList.remove('active')
          }
          if (backdrop) {
            backdrop.style.display = 'none'
          }
        },
        { once: true },
      )
    }
  },

  backdropSidebar(event: Event): void {
    event.preventDefault()
    const backdrop = document.querySelector('.backdrop') as HTMLElement
    if (backdrop) {
      backdrop.style.display = 'block'
      backdrop.style.opacity = '1'

      backdrop.onclick = () => {
        backdrop.style.display = 'none'

        document.body.style.overflow = 'inherit'

        const cartSidebar = document.querySelector('.cart-sidebar') as HTMLElement
        const navSidebar = document.querySelector('.nav-sidebar') as HTMLElement
        const categorySidebar = document.querySelector('.category-sidebar') as HTMLElement

        if (cartSidebar) cartSidebar.classList.remove('active')
        if (navSidebar) navSidebar.classList.remove('active')
        if (categorySidebar) categorySidebar.classList.remove('active')
      }
    }
  },

  cartAndBackdropClick(event: Event): void {
    handlers.cartClickHandler(event)
    handlers.backdropSidebar(event)
  },

  CategoryClickHAndler(event: Event): void {
    event.preventDefault()
    document.body.style.overflow = 'hidden'

    const categorySidebar = document.querySelector('.category-sidebar') as HTMLElement
    if (categorySidebar) {
      categorySidebar.classList.add('active')
    }

    const backdrop = document.querySelector('.backdrop') as HTMLElement
    if (backdrop) {
      backdrop.style.display = 'block'
    }

    const categoryClose = document.querySelector('.category-close') as HTMLElement
    if (categoryClose) {
      categoryClose.addEventListener(
        'click',
        () => {
          document.body.style.overflow = 'inherit'
          if (categorySidebar) {
            categorySidebar.classList.remove('active')
          }
          if (backdrop) {
            backdrop.style.display = 'none'
          }
        },
        { once: true },
      )
    }
  },
  CategoryAndBackdropClick(event: Event): void {
    handlers.CategoryClickHAndler(event)
    handlers.backdropSidebar(event)
  },
  dropdownClickHandler(event: Event): void {
    event.preventDefault()

    const dropdownLink = event.currentTarget as HTMLElement
    const dropdownList = dropdownLink.nextElementSibling as HTMLElement

    if (dropdownList) {
      dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block'
    }

    dropdownLink.classList.toggle('active')

    const visibleDropdowns = document.querySelectorAll('.dropdown-list[style="display: block"]')
    if (visibleDropdowns.length > 1) {
      document.querySelectorAll('.dropdown-list').forEach((list) => {
        ;(list as HTMLElement).style.display = 'none'
      })

      if (dropdownList) {
        dropdownList.style.display = 'block'
      }
      document.querySelectorAll('.dropdown-link').forEach((link) => {
        link.classList.remove('active')
      })
      dropdownLink.classList.add('active')
    }
  },
  HeaderUserClickHandle(event: Event): void {
    event.preventDefault()

    document.body.style.overflow = 'hidden'
    const headerUser = document.querySelector('.nav-sidebar') as HTMLElement
    if (headerUser) {
      headerUser.classList.add('active')
    }
    const backdrop = document.querySelector('.backdrop') as HTMLElement
    if (backdrop) {
      backdrop.style.display = 'block'
    }
    const NavClose = document.querySelector('.nav-close') as HTMLElement
    if (NavClose) {
      NavClose.addEventListener(
        'click',
        () => {
          document.body.style.overflow = 'inherit'
          if (headerUser) {
            headerUser.classList.remove('active')
          }
          if (backdrop) {
            backdrop.style.display = 'none'
          }
        },
        { once: true },
      )
    }
  },
  HeaderUserAndBackdropClick(event: Event): void {
    handlers.HeaderUserClickHandle(event)
    handlers.backdropSidebar(event)
  },
}
