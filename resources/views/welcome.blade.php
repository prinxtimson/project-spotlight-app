<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Tritek Consulting Ltd</title>
  <link rel="icon" href="https://tritekconsulting.co.uk/wp-content/uploads/2021/01/logo-e1607448801387-1.png">

  <link rel="stylesheet" href="{{asset('css/app.css')}}">

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />


  <!-- Styles -->
  <style>
  /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%
  }

  body {
    margin: 0
  }

  a {
    background-color: transparent
  }

  [hidden] {
    display: none
  }

  html {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    line-height: 1.5
  }

  *,
  :after,
  :before {
    box-sizing: border-box;
    border: 0 solid #e2e8f0
  }

  a {
    color: inherit;
    text-decoration: inherit
  }

  svg,
  video {
    display: block;
  }

  video {
    max-width: 100%;
    height: auto
  }

  .bg-white {
    --bg-opacity: 1;
    background-color: #fff;
    background-color: rgba(255, 255, 255, var(--bg-opacity))
  }

  .bg-gray-100 {
    --bg-opacity: 1;
    background-color: #f7fafc;
    background-color: rgba(247, 250, 252, var(--bg-opacity))
  }

  .border-gray-200 {
    --border-opacity: 1;
    border-color: #edf2f7;
    border-color: rgba(237, 242, 247, var(--border-opacity))
  }

  .border-t {
    border-top-width: 1px
  }

  .flex {
    display: flex
  }

  .grid {
    display: grid
  }

  .hidden {
    display: none
  }

  .items-center {
    align-items: center
  }

  .justify-center {
    justify-content: center
  }

  .font-semibold {
    font-weight: 600
  }

  .h-5 {
    height: 1.25rem
  }

  .h-8 {
    height: 2rem
  }

  .h-16 {
    height: 4rem
  }

  .text-sm {
    font-size: .875rem
  }

  .text-lg {
    font-size: 1.125rem
  }

  .leading-7 {
    line-height: 1.75rem
  }

  .mx-auto {
    margin-left: auto;
    margin-right: auto
  }

  .ml-1 {
    margin-left: .25rem
  }

  .mt-2 {
    margin-top: .5rem
  }

  .mr-2 {
    margin-right: .5rem
  }

  .ml-2 {
    margin-left: .5rem
  }

  .mt-4 {
    margin-top: 1rem
  }

  .ml-4 {
    margin-left: 1rem
  }

  .mt-8 {
    margin-top: 2rem
  }

  .ml-12 {
    margin-left: 3rem
  }

  .-mt-px {
    margin-top: -1px
  }

  .max-w-6xl {
    max-width: 72rem
  }

  .min-h-screen {
    min-height: 100vh
  }

  .overflow-hidden {
    overflow: hidden
  }

  .p-6 {
    padding: 1.5rem
  }

  .py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem
  }

  .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem
  }

  .pt-8 {
    padding-top: 2rem
  }

  .fixed {
    position: fixed
  }

  .relative {
    position: relative
  }

  .top-0 {
    top: 0
  }

  .right-0 {
    right: 0
  }

  .shadow {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)
  }

  .text-center {
    text-align: center
  }

  .text-gray-200 {
    --text-opacity: 1;
    color: #edf2f7;
    color: rgba(237, 242, 247, var(--text-opacity))
  }

  .text-gray-300 {
    --text-opacity: 1;
    color: #e2e8f0;
    color: rgba(226, 232, 240, var(--text-opacity))
  }

  .text-gray-400 {
    --text-opacity: 1;
    color: #cbd5e0;
    color: rgba(203, 213, 224, var(--text-opacity))
  }

  .text-gray-500 {
    --text-opacity: 1;
    color: #a0aec0;
    color: rgba(160, 174, 192, var(--text-opacity))
  }

  .text-gray-600 {
    --text-opacity: 1;
    color: #718096;
    color: rgba(113, 128, 150, var(--text-opacity))
  }

  .text-gray-700 {
    --text-opacity: 1;
    color: #4a5568;
    color: rgba(74, 85, 104, var(--text-opacity))
  }

  .text-gray-900 {
    --text-opacity: 1;
    color: #1a202c;
    color: rgba(26, 32, 44, var(--text-opacity))
  }

  .underline {
    text-decoration: underline
  }

  .antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
  }

  .w-5 {
    width: 1.25rem
  }

  .w-8 {
    width: 2rem
  }

  .w-auto {
    width: auto
  }

  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr))
  }


  @media (min-width:640px) {
    .sm\:rounded-lg {
      border-radius: .5rem
    }

    .sm\:block {
      display: block
    }

    .sm\:items-center {
      align-items: center
    }

    .sm\:justify-start {
      justify-content: flex-start
    }

    .sm\:justify-between {
      justify-content: space-between
    }

    .sm\:h-20 {
      height: 5rem
    }

    .sm\:ml-0 {
      margin-left: 0
    }

    .sm\:px-6 {
      padding-left: 1.5rem;
      padding-right: 1.5rem
    }

    .sm\:pt-0 {
      padding-top: 0
    }

    .sm\:text-left {
      text-align: left
    }

    .sm\:text-right {
      text-align: right
    }
  }

  @media (min-width:768px) {
    .md\:border-t-0 {
      border-top-width: 0
    }

    .md\:border-l {
      border-left-width: 1px
    }

    .md\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr))
    }
  }

  @media (min-width:1024px) {
    .lg\:px-8 {
      padding-left: 2rem;
      padding-right: 2rem
    }
  }

  @media (prefers-color-scheme:dark) {
    .dark\:bg-gray-800 {
      --bg-opacity: 1;
      background-color: #2d3748;
      background-color: rgba(45, 55, 72, var(--bg-opacity))
    }

    .dark\:bg-gray-900 {
      --bg-opacity: 1;
      background-color: #1a202c;
      background-color: rgba(26, 32, 44, var(--bg-opacity))
    }

    .dark\:border-gray-700 {
      --border-opacity: 1;
      border-color: #4a5568;
      border-color: rgba(74, 85, 104, var(--border-opacity))
    }

    .dark\:text-white {
      --text-opacity: 1;
      color: #fff;
      color: rgba(255, 255, 255, var(--text-opacity))
    }

    .dark\:text-gray-400 {
      --text-opacity: 1;
      color: #cbd5e0;
      color: rgba(203, 213, 224, var(--text-opacity))
    }

    .dark\:text-gray-500 {
      --tw-text-opacity: 1;
      color: #6b7280;
      color: rgba(107, 114, 128, var(--tw-text-opacity))
    }
  }
  </style>

  <style>
  body {
    font-family: 'Rubik', 'Roboto', sans-serif;
  }
  iframe .tawk-min-container {
    display: none !important;
  }
  .my-custom-bg {
    background-color: #f5f7ff;
}
  </style>
</head>

<body class="antialiased" >
  @if (!empty($user))
  <div id="app" class="relative flex items-top min-h-screen my-custom-bg" data-user="{{$user}}">
  @else
  <div id="app" class="relative flex items-top min-h-screen my-custom-bg"  >
  @endif
  
    <script src="{{asset('js/app.js')}}"></script>
  </div>

<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6527e872eb150b3fb9a0be53/1hchu80ts';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->

  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase.js"></script>
<script>
    var firebaseConfig = {
      apiKey: "AIzaSyDHXdjVllGxZ_nTbzV4guj3DmnUoZlDGNU",
    authDomain: "spotlight-f6663.firebaseapp.com",
    projectId: "spotlight-f6663",
    storageBucket: "spotlight-f6663.appspot.com",
    messagingSenderId: "825975225494",
    appId: "1:825975225494:web:4c37260f2e5f2496fc16b7",
    measurementId: "G-L0L8JRZ4EK",
    };
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    function startFCM() {
        messaging
            .requestPermission()
            .then(function () {
                return messaging.getToken()
            })
            .then(function (response) {
              
              localStorage.setItem('device_token', response)
                
            }).catch(function (error) {
                alert(error);
            });
    }
    messaging.onMessage(function (payload) {
      
        const title = payload.notification.title;
        const options = {
            body: payload.notification.body,
            icon: "/images/logo.png",
        };
        new Notification(title, options);
    });

    $(document).ready(function() {

      $(document).one('click', function() {
        
        if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        startFCM() 
      }else {
        Notification.requestPermission().then(function(permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            startFCM() 
          }
        })
      }
      })
    })

  var timerId = setInterval(myFunc, 1000);
  function myFunc()  {
      let tawkDiv = document.getElementsByClassName("widget-visible")[0];
      if(tawkDiv){
        let tawkFrame = tawkDiv.getElementsByTagName("iframe")[0];
        let tawkBtnContainer =
            tawkFrame.contentWindow.document.getElementsByClassName(
                "tawk-min-container"
            )[0];
            tawkBtnContainer.style.display = "none"
            clearInterval(timerId)
      }
      
    };
   
</script>

</body>

</html>