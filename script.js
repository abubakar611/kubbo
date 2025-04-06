import { Chart } from "@/components/ui/chart"
// Custom cursor
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor-follower")

  // Only enable custom cursor on non-touch devices
  if (!("ontouchstart" in window)) {
    cursor.style.display = "block"

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
    })

    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .btn, .play-button, .meme-placeholder")

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.width = "50px"
        cursor.style.height = "50px"
        cursor.style.backgroundColor = "rgba(255, 107, 107, 0.3)"
      })

      el.addEventListener("mouseleave", () => {
        cursor.style.width = "30px"
        cursor.style.height = "30px"
        cursor.style.backgroundColor = "rgba(255, 107, 107, 0.5)"
      })
    })
  }

  // Mobile menu toggle - Fixed for better mobile interaction
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")
  const bars = document.querySelectorAll(".bar")

  if (menuToggle) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation() // Prevent event bubbling
      navLinks.classList.toggle("active")

      // Toggle active class on bars
      bars.forEach((bar) => bar.classList.toggle("active"))

      // Prevent scrolling when menu is open
      if (navLinks.classList.contains("active")) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navLinks &&
      navLinks.classList.contains("active") &&
      !e.target.closest(".nav-links") &&
      !e.target.closest(".menu-toggle")
    ) {
      navLinks.classList.remove("active")
      bars.forEach((bar) => bar.classList.remove("active"))
      document.body.style.overflow = ""
    }
  })

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        bars.forEach((bar) => bar.classList.remove("active"))
        document.body.style.overflow = ""
      }
    })
  })

  // Coming Soon Modal
  const comingSoonModal = document.querySelector(".coming-soon-modal")
  const modalClose = document.querySelector(".modal-close")
  const comingSoonTriggers = document.querySelectorAll(".coming-soon-trigger")

  // Handle coming soon links
  const handleComingSoonLinks = () => {
    // Find all links that point to coming.html
    const comingLinks = document.querySelectorAll('a[href="coming.html"]')

    comingLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()

        // If we have a modal, show it
        if (comingSoonModal) {
          comingSoonModal.classList.add("active")
          document.body.style.overflow = "hidden" // Prevent scrolling
        } else {
          // Otherwise, redirect to the coming soon page
          window.location.href = link.getAttribute("href")
        }
      })
    })
  }

  // Call the function to handle coming soon links
  handleComingSoonLinks()

  // Open modal when clicking on specific links
  if (comingSoonTriggers) {
    comingSoonTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault()
        if (comingSoonModal) {
          comingSoonModal.classList.add("active")
          document.body.style.overflow = "hidden" // Prevent scrolling
        }
      })
    })
  }

  // Close modal when clicking the close button
  if (modalClose) {
    modalClose.addEventListener("click", () => {
      comingSoonModal.classList.remove("active")
      document.body.style.overflow = "" // Re-enable scrolling
    })
  }

  // Close modal when clicking outside the content
  if (comingSoonModal) {
    comingSoonModal.addEventListener("click", (e) => {
      if (e.target === comingSoonModal) {
        comingSoonModal.classList.remove("active")
        document.body.style.overflow = "" // Re-enable scrolling
      }
    })
  }

  // Update countdown timer
  function updateCountdown() {
    const countdownElements = document.querySelectorAll(".countdown-value")
    if (countdownElements.length === 0) return

    // Set launch date (adjust as needed)
    const launchDate = new Date("2025-01-01T00:00:00")
    const now = new Date()

    const diff = launchDate - now

    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    // Update the DOM
    countdownElements[0].textContent = days
    countdownElements[1].textContent = hours
    countdownElements[2].textContent = minutes
    countdownElements[3].textContent = seconds
  }

  // Update countdown every second
  setInterval(updateCountdown, 1000)
  updateCountdown()

  // Add "Coming Soon" overlays to elements without links or with placeholder links
  function addComingSoonOverlays() {
    // Find all product placeholders with "COMING SOON" text
    const comingSoonElements = document.querySelectorAll(".product-placeholder:not(:has(img))")

    comingSoonElements.forEach((element) => {
      // Add the coming-soon-container class
      element.classList.add("coming-soon-container")

      // Create the overlay
      const overlay = document.createElement("div")
      overlay.className = "coming-soon-overlay"

      // Create the text element
      const text = document.createElement("div")
      text.className = "coming-soon-text"
      text.innerHTML = "Coming Soon 🚀"

      // Append the text to the overlay
      overlay.appendChild(text)

      // Append the overlay to the element
      element.appendChild(overlay)

      // Replace the text content with a more generic placeholder
      if (element.textContent.trim() === "COMING SOON") {
        element.textContent = ""
      }
    })

    // Find all links that point to "#" (placeholder links)
    const placeholderLinks = document.querySelectorAll(
      'a[href="#"]:not(.btn-connect):not([href^="#home"]):not([href^="#about"])',
    )

    placeholderLinks.forEach((link) => {
      // Add the coming-soon-container class
      link.classList.add("coming-soon-container")

      // Create the overlay
      const overlay = document.createElement("div")
      overlay.className = "coming-soon-overlay"

      // Create the text element
      const text = document.createElement("div")
      text.className = "coming-soon-text"
      text.innerHTML = "Coming Soon 🚀"

      // Append the text to the overlay
      overlay.appendChild(text)

      // Append the overlay to the link
      link.appendChild(overlay)

      // Prevent default action for these links
      link.addEventListener("click", (e) => {
        e.preventDefault()
      })
    })
  }

  // Call the function to add overlays
  addComingSoonOverlays()

  // Animate stats counter
  const stats = [
    { id: "holders-count", target: 5243 },
    { id: "market-cap", prefix: "$", target: 2.5, suffix: "M" },
    { id: "community-members", target: 12, suffix: "K" },
  ]

  function animateStats() {
    stats.forEach((stat) => {
      const el = document.getElementById(stat.id)
      if (!el) return // Skip if element doesn't exist

      const prefix = stat.prefix || ""
      const suffix = stat.suffix || ""

      let current = 0
      const increment = stat.target / 100
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.target) {
          current = stat.target
          clearInterval(timer)
        }

        if (Number.isInteger(stat.target)) {
          el.textContent = prefix + Math.floor(current) + suffix
        } else {
          el.textContent = prefix + current.toFixed(1) + suffix
        }
      }, 20)
    })
  }

  // Intersection Observer for animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "holders-count") {
            animateStats()
          }
          entry.target.classList.add("animate")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  // Observe elements for animation
  document.querySelectorAll(".hero-stats, .character, .benefit, .product, .timeline-item").forEach((el) => {
    observer.observe(el)
  })

  // Tokenomics Chart - Improved for mobile
  const ctx = document.getElementById("tokenomicsChart")

  if (ctx) {
    // Function to determine chart options based on screen size
    function getChartOptions() {
      const isMobile = window.innerWidth < 768

      return {
        type: "doughnut",
        data: {
          labels: ["Community Rewards", "Liquidity", "Team", "Marketing", "Development"],
          datasets: [
            {
              data: [40, 30, 15, 10, 5],
              backgroundColor: ["#FF6B6B", "#4ECDC4", "#FFD166", "#6A0572", "#1A535C"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => context.label + ": " + context.raw + "%",
              },
            },
          },
          cutout: isMobile ? "60%" : "70%",
        },
      }
    }

    // Create the chart with responsive options
    let tokenomicsChart
    try {
      tokenomicsChart = new Chart(ctx, getChartOptions())

      // Update chart on window resize
      window.addEventListener("resize", () => {
        if (tokenomicsChart) {
          tokenomicsChart.destroy()
          tokenomicsChart = new Chart(ctx, getChartOptions())
        }
      })
    } catch (error) {
      console.log("Chart initialization error:", error)
    }
  }

  // Fix tokenomics legend on mobile
  function adjustTokenomicsLegend() {
    const tokenomicsLegend = document.querySelector(".tokenomics-legend")
    if (tokenomicsLegend) {
      if (window.innerWidth <= 768) {
        // Mobile view - adjust layout
        tokenomicsLegend.style.display = "grid"
        tokenomicsLegend.style.gridTemplateColumns = "1fr"
        tokenomicsLegend.style.gap = "0.8rem"
        tokenomicsLegend.style.marginRight = "0"
        tokenomicsLegend.style.marginBottom = "2rem"
        tokenomicsLegend.style.textAlign = "left"
        tokenomicsLegend.style.padding = "0 1rem"
      } else {
        // Desktop view - reset styles
        tokenomicsLegend.style.display = "flex"
        tokenomicsLegend.style.flexWrap = "wrap"
        tokenomicsLegend.style.justifyContent = "center"
        tokenomicsLegend.style.gap = "1rem"
        tokenomicsLegend.style.marginRight = "0"
        tokenomicsLegend.style.marginBottom = "0"
      }
    }
  }

  // Call initially and on resize
  adjustTokenomicsLegend()
  window.addEventListener("resize", adjustTokenomicsLegend)

  // Play button animation
  const playButton = document.querySelector(".play-button")
  if (playButton) {
    playButton.addEventListener("click", function () {
      this.classList.add("clicked")
      setTimeout(() => {
        this.classList.remove("clicked")
        alert("Video player would open here!")
      }, 300)
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Adjust scroll position based on screen size
        const headerHeight = document.querySelector("header")?.offsetHeight || 80
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: "smooth",
        })
      }
    })
  })

  // Header scroll effect
  const header = document.querySelector("header")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      header.style.padding = "0.5rem 5%"
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.padding = "1rem 5%"
      header.style.boxShadow = "none"
    }

    lastScrollTop = scrollTop
  })

  // Connect wallet button effect
  const connectBtn = document.querySelector(".btn-connect")
  if (connectBtn) {
    connectBtn.addEventListener("click", (e) => {
      e.preventDefault()
      // If we have a modal, show it instead of alert
      if (comingSoonModal) {
        comingSoonModal.classList.add("active")
        document.body.style.overflow = "hidden"
      } else {
        alert("Wallet connection would happen here!")
      }
    })
  }

  // Random meme movement - optimized for mobile
  function randomMovement() {
    const memes = document.querySelectorAll(".floating-memes .meme-placeholder")

    // Skip animation on small screens to improve performance
    if (window.innerWidth < 576) {
      return
    }

    memes.forEach((meme) => {
      const randomX = Math.random() * 10 - 5
      const randomY = Math.random() * 10 - 5
      const randomRotate = Math.random() * 10 - 5

      meme.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`

      setTimeout(() => {
        meme.style.transform = "translate(0, 0) rotate(0deg)"
      }, 500)
    })

    setTimeout(randomMovement, 3000)
  }

  randomMovement()

  // Fix video sizing on mobile
  function adjustVideoSize() {
    const videos = document.querySelectorAll(".animation video")
    videos.forEach((video) => {
      if (window.innerWidth <= 576) {
        video.style.height = "230px"
        video.style.width = "100%"
        video.style.objectFit = "contain"
      } else if (window.innerWidth <= 768) {
        video.style.height = "280px"
        video.style.width = "100%"
        video.style.objectFit = "contain"
      } else {
        video.style.height = "360px"
        video.style.width = "auto"
        video.style.objectFit = "initial"
      }
    })
  }

  // Call initially and on resize
  adjustVideoSize()
  window.addEventListener("resize", adjustVideoSize)

  // Fix mobile touch events for better interaction
  function enhanceTouchInteractions() {
    // Add active state for buttons on touch
    const touchButtons = document.querySelectorAll(".btn, .social-link, .modal-social-link")
    touchButtons.forEach((button) => {
      button.addEventListener(
        "touchstart",
        function () {
          this.classList.add("touch-active")
        },
        { passive: true },
      )

      button.addEventListener(
        "touchend",
        function () {
          this.classList.remove("touch-active")
        },
        { passive: true },
      )
    })

    // Improve scrolling performance
    if ("ontouchstart" in window) {
      document.documentElement.classList.add("touch-device")
    }
  }

  enhanceTouchInteractions()

  // Fix tokenomics chart display on mobile
  function fixTokenomicsChart() {
    const tokenomicsSection = document.querySelector(".tokenomics")
    if (tokenomicsSection) {
      if (window.innerWidth <= 576) {
        // Ensure chart is visible on small screens
        const chartContainer = document.querySelector(".tokenomics-chart")
        if (chartContainer) {
          chartContainer.style.marginBottom = "0"
        }
      }
    }
  }

  fixTokenomicsChart()
  window.addEventListener("resize", fixTokenomicsChart)
})

