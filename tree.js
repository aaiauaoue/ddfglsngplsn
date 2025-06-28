document.addEventListener("DOMContentLoaded", function() {
  // Toggle folders
  var togglers = document.getElementsByClassName("caret");
  for (var i = 0; i < togglers.length; i++) {
    togglers[i].addEventListener("click", function() {
      var nested = this.parentElement.querySelector(".nested");
      if (nested) {
        nested.classList.toggle("active");
        this.classList.toggle("caret-down");
      }
    });
  }

  // Handle file click and display in viewer
  var files = document.getElementsByClassName("file");
  for (var j = 0; j < files.length; j++) {
    files[j].addEventListener("click", function() {
     var viewer = document.getElementById("viewer");

  // Fjern aktiv markering fra alle filer
    for (var k = 0; k < files.length; k++) {
     files[k].classList.remove("active-file");
    }

  // Marker denne fil
     this.classList.add("active-file");

  // formatér tekst med linjeskift
    var formattedText = this.dataset.content.replace(/\\n/g, "<br>");
    var content = "<h2>" + this.textContent + "</h2><p>" + formattedText + "</p>";

  // vis billeder hvis de findes
    if (this.dataset.imgs) {
     var imgList = this.dataset.imgs.split('#');
     imgList.forEach(function(src) {
      content += "<img src='" + src.trim() + "' alt='værkbillede' style='max-width:100%; margin-top:1em;'>";
    });
  }

  // vis video hvis den findes
if (this.dataset.video) {
  // YouTube embed eller lokal video?
  if (this.dataset.video.includes("youtube.com/embed")) {
    content += "<iframe width='100%' height='315' src='" + this.dataset.video + "' frameborder='0' allowfullscreen style='margin-top:1em;'></iframe>";
  } else {
    content += "<video controls style='max-width:100%; margin-top:1em;'><source src='" + this.dataset.video + "' type='video/mp4'>Din browser understøtter ikke video.</video>";
  }
}


  viewer.innerHTML = content;
});

  }
});

      viewer.innerHTML = content;
    });
  }
});
