  document.addEventListener("DOMContentLoaded", function () {
    let inp = document.querySelector(".input");
    let btn = document.querySelector(".add");
    let box = document.querySelector(".tasks");

    let tasks = [];

    if (localStorage.getItem("tasks")) {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    load();

    btn.onclick = function () {
      if (inp.value !== "") {
        add(inp.value);
        inp.value = "";
      }
    };

    box.addEventListener("click", (e) => {
      if (e.target.classList.contains("del")) {
        remove(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
      }

      if (e.target.classList.contains("task")) {
        toggle(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
      }
    });

    function add(txt) {
      const obj = {
        id: Date.now(),
        title: txt,
        done: false,
      };
      tasks.push(obj);
      render(tasks);
      save(tasks);
    }

    function render(arr) {
      box.innerHTML = "";
      arr.forEach((t) => {
        let d = document.createElement("div");
        d.className = t.done ? "task done" : "task";
        d.setAttribute("data-id", t.id);
        d.appendChild(document.createTextNode(t.title));

        let s = document.createElement("span");
        s.className = "del";
        s.textContent = "Delete";

        d.appendChild(s);
        box.appendChild(d);
      });
    }

    function save(arr) {
      localStorage.setItem("tasks", JSON.stringify(arr));
    }

    function load() {
      let data = localStorage.getItem("tasks");
      if (data) {
        tasks = JSON.parse(data);
        render(tasks);
      }
    }

    function remove(id) {
      tasks = tasks.filter((t) => t.id != id);
      save(tasks);
    }

    function toggle(id) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
          tasks[i].done = !tasks[i].done;
        }
      }
      save(tasks);
    }
  });

