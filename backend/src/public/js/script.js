
$(function(){
  var url = window.location.href; 
  $(".navbar-nav a").each(function() {
      if(url == (this.href)) { 
          $(this).closest("li").addClass("active");
      }
  });
});

$(function(){
  var url = window.location.href; 
  $("#icon i").each(function() {
    if(url == (this.href)) { 
        $(this).addClass("text-dark");
    }
  });
});


document.querySelectorAll("#index .card").forEach(function(card){
  card.addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "explore/" + card.id;
  })
})

document.querySelectorAll("#dashboard .card").forEach(function(card){
  card.addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "dashboard/" + card.id;
  })
})

document.querySelectorAll("#build .card").forEach(function(card){
  card.addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "build/" + card.id;
  })
})

const settings = document.querySelector(".settings");
if (settings) {
  settings.addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = window.location.origin + `/groups/${settings.id}/edit`;
  })
}


const searchGroup = document.querySelector(".search-group");
if (searchGroup) {
  searchGroup.addEventListener("input", function(e) {
    e.preventDefault();
    const params = new URLSearchParams({
      search : e.target.value
    });
    window.location.href = window.location.href + "?" + params.toString();
  })
}

const notify = document.getElementById("notify");
if (notify) { 
  notify.addEventListener("click", function(e) {
    e.preventDefault();
    $(function() {
      $('[data-toggle="popover"]').popover();
    })
  })
}

const createButt = document.getElementById("createButt");
if (createButt) createButt.addEventListener("click", function(e) {
  e.preventDefault();
  $('#createForm').modal('show');
})

const editProfileButt = document.getElementById("editProfileButt");
if (editProfileButt) editProfileButt.addEventListener("click", function(e){
  e.preventDefault();
  $('#editProfileForm').modal('show');
})

const quitGroupButt = document.getElementById("quitGroupButt");
if (quitGroupButt) quitGroupButt.addEventListener("click", function(e) {
  e.preventDefault();
  $('#quitGroupForm').modal('show');
})

const quitYesButt = document.getElementById("quitYesButt");
if (quitYesButt) quitYesButt.addEventListener("click", function(e) {
  e.preventDefault();
  $('#quitGroupForm').modal('hide');
  $('#commentForm').modal('show');

})

const ratings = document.querySelector('#rating');
if (ratings) ratings.addEventListener('click', function (e) {
  let action = 'add';
  let cnt = 0;
  for (const span of this.children) {
      if (action == 'add') cnt++;
      span.classList[action]('active');
      if (span === e.target) { 
          action = 'remove';
      }
  }
  console.log(cnt);
});

const groups = document.querySelectorAll('.gotochat');
if (groups) groups.forEach(function(group) {
  group.addEventListener('click', function (e) {
      window.location.href = '../chat/dark-mode/dark-mode.html';
  }) 
})