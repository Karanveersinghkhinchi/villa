// Firebase Config (Unchanged)
const firebaseConfig = {
    apiKey: "AIzaSyBh7_G44BemcmSqaY8clanTysWy70b713A",
    authDomain: "chandravillakotharia-1859c.firebaseapp.com",
    databaseURL: "https://chandravillakotharia-1859c-default-rtdb.firebaseio.com/",
    projectId: "chandravillakotharia-1859c",
    storageBucket: "chandravillakotharia-1859c.firebasestorage.app",
    messagingSenderId: "210995485996",
    appId: "1:210995485996:web:9a905efa520d5b1e60a089",
    measurementId: "G-VM2T3VWLBG"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Mobile Navbar Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    menuToggle.textContent = mobileNav.classList.contains('active') ? '×' : '☰';
  });
  
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
      mobileNav.classList.remove('active');
      menuToggle.textContent = '☰';
    });
  });
  
  document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Gallery Slider with Auto-Slide
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  setInterval(nextSlide, 5000);
  showSlide(currentSlide);
  
  // Gallery Modal
  const exploreMoreBtn = document.getElementById('explore-more');
  const galleryModal = document.getElementById('gallery-modal');
  const closeModal = document.querySelector('.close-modal');
  exploreMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    galleryModal.classList.add('active');
  });
  closeModal.addEventListener('click', () => {
    galleryModal.classList.remove('active');
  });
  
  // Gallery Hover Effect
  document.querySelectorAll('.hover-img').forEach(img => {
    img.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.classList.add('image-modal');
      modal.innerHTML = `
        <span class="close-image-modal">×</span>
        <img src="${img.src}" alt="${img.alt}" class="full-img">
      `;
      document.body.appendChild(modal);
      modal.querySelector('.close-image-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
      });
    });
  });
  
  // Games Modal
  const gamesFacility = document.getElementById('games-facility');
  const gamesModal = document.getElementById('games-modal');
  const closeGamesModal = document.querySelector('.close-games-modal');
  gamesFacility.addEventListener('click', () => {
    gamesModal.classList.add('active');
  });
  closeGamesModal.addEventListener('click', () => {
    gamesModal.classList.remove('active');
  });
  
  // Experiences Slider with Auto-Slide
  let currentExperienceSlide = 0;
  const experienceSlides = document.querySelectorAll('.experience-slide');
  function showExperienceSlide(index) {
    experienceSlides.forEach(slide => slide.classList.remove('active'));
    experienceSlides[index].classList.add('active');
  }
  function nextExperienceSlide() {
    currentExperienceSlide = (currentExperienceSlide + 1) % experienceSlides.length;
    showExperienceSlide(currentExperienceSlide);
  }
  setInterval(nextExperienceSlide, 5000);
  showExperienceSlide(currentExperienceSlide);
  
  // Dynamic Pricing (Fetch rate from Firebase)
  const checkinDateInput = document.getElementById('checkin-date');
  const checkoutDateInput = document.getElementById('checkout-date');
  const adultsInput = document.getElementById('booking-details').querySelector('input[name="adults"]');
  const kidsInput = document.getElementById('booking-details').querySelector('input[name="kids"]');
  const totalPriceElement = document.getElementById('total-price');
  const dynamicPriceElement = document.getElementById('dynamic-price');
  const totalAmountField = document.getElementById('total-amount-field');
  let nightRate = 19999; // Default rate, Firebase se overwrite hoga
  
  database.ref('villaRate').on('value', (snapshot) => {
    const rate = snapshot.val();
    if (rate) {
      nightRate = parseInt(rate);
      dynamicPriceElement.textContent = `₹${nightRate}`;
      calculateTotalPrice();
    }
  }, (error) => {
    console.error("Error fetching rate: ", error);
    dynamicPriceElement.textContent = `₹${nightRate}`;
  });
  
  function calculateTotalPrice() {
    const checkin = new Date(checkinDateInput.value);
    const checkout = new Date(checkoutDateInput.value);
    const nights = (checkout - checkin) / (1000 * 60 * 60 * 24);
    const total = nightRate * (nights || 1);
    totalPriceElement.textContent = total || nightRate;
    dynamicPriceElement.textContent = `₹${nightRate}`;
    totalAmountField.value = `Total Amount: ₹${total || nightRate}`;
  }
  
  checkinDateInput.addEventListener('change', calculateTotalPrice);
  checkoutDateInput.addEventListener('change', calculateTotalPrice);
  
  // Terms Toggle
  const termsToggle = document.getElementById('terms-toggle');
  const termsContent = document.getElementById('terms-content');
  termsToggle.addEventListener('click', () => {
    termsContent.style.display = termsContent.style.display === 'none' ? 'block' : 'none';
    termsToggle.textContent = termsContent.style.display === 'none' ? 'Show Terms & Conditions' : 'Hide Terms & Conditions';
  });
  
  // Book Now Buttons
  function scrollToBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    const headerHeight = document.querySelector('header').offsetHeight || 0;
    window.scrollTo({ top: bookingForm.offsetTop - headerHeight, behavior: 'smooth' });
  }
  
  document.getElementById('book-now-hero-btn').addEventListener('click', scrollToBookingForm);
  document.getElementById('sticky-book-now-btn').addEventListener('click', scrollToBookingForm);
  document.getElementById('book-now-about-btn').addEventListener('click', scrollToBookingForm);
  document.getElementById('book-now-contact-btn').addEventListener('click', scrollToBookingForm);
  
  // Scroll to Top Button
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Razorpay Payment with Formspree Integration
  document.getElementById('proceed-to-pay').addEventListener('click', function(e) {
    e.preventDefault();
    const form = document.getElementById('booking-details');
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const checkin = checkinDateInput.value;
    const checkout = checkoutDateInput.value;
    const adults = adultsInput.value;
    const kids = kidsInput.value;
    const termsAgree = document.getElementById('terms-agree').checked;
  
    if (!form.checkValidity() || !termsAgree) {
      alert('Please fill all required fields and agree to terms.');
      return;
    }
  
    if (adults > 8 || kids > 4) {
      alert('Maximum limit exceeded: 8 adults and 4 kids allowed.');
      return;
    }
  
    const totalAmount = parseInt(totalPriceElement.textContent);
    const options = {
      "key": "rzp_test_D6yDZcx1J1MnIY", // Replace with your Razorpay Live Key for production
      "amount": totalAmount * 100, // In paise
      "currency": "INR",
      "name": "Chandra Villa",
      "description": "4BHK Villa Booking with Meals",
      "handler": function(response) {
        // Payment success message
        alert("Payment successful! Your booking is confirmed. We’ll contact you soon on WhatsApp. Payment ID: " + response.razorpay_payment_id);
  
        // Formspree pe data bhejein (aapke email pe aayega)
        fetch('https://formspree.io/f/mgvapbel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            checkin: checkin,
            checkout: checkout,
            adults: adults,
            kids: kids,
            totalAmount: totalAmount,
            paymentId: response.razorpay_payment_id,
            timestamp: new Date().toISOString()
          })
        }).then(() => {
          // Optional: Firebase mein save karna
          const bookingRef = database.ref('bookings').push();
          bookingRef.set({
            name: name,
            email: email,
            phone: phone,
            checkin: checkin,
            checkout: checkout,
            adults: adults,
            kids: kids,
            paymentId: response.razorpay_payment_id,
            totalAmount: totalAmount,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            // Google Analytics Event (unchanged)
            gtag('event', 'booking_completed', {
              'event_category': 'Booking',
              'event_label': name,
              'value': totalAmount
            });
          }).catch((error) => {
            console.error("Error saving to Firebase:", error);
          });
          window.location.href = "/thank-you.html";
        }).catch((error) => {
          console.error("Error sending to Formspree:", error);
          alert("Payment successful, but there was an issue sending details. Please contact us.");
        });
      },
      "prefill": {
        "name": name,
        "email": email,
        "contact": phone
      },
      "theme": {
        "color": "#D4AF37"
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  });