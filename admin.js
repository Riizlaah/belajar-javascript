/// <reference path="./jquery.js" /> 

let idcounter = 0;
let menu_table = [];
let name_inp2;
let desc_inp2;
let price_inp2;
let editmenu;
let curr_id;
let table;
let num = 0;

function add_row(id, name, desc, price) {
  num += 1;
  let desc2 = desc.replace(/\n/g, "<br>");
  table.append("<tr><td>"+(num)+"</td><td><button class=\"btn-warn\" onclick=\"edit_menu("+id+")\">Edit</button><br><button class=\"btn-danger\" onclick=\"del_menu("+id+")\">Hapus</button></td><td>"+name+"</td><td>"+desc2+"</td><td> Rp. "+price+"</td><tr>");
}
function draw_rows() {
  table.empty();
  table.append("<tr><th>No.</th><th>Aksi</th><th>Nama Menu</th><th>Deskripsi Menu</th><th>Harga Menu</th></tr>");
  menu_table.forEach(function(val){
    add_row(val.id, val.name, val.desc, val.price)
  });
}
function edit_menu(id) {
  curr_id = id;
  let data = {};
  menu_table.forEach(function(val) {
    if(val.id == id) {
      data = val;
    }
  });
  name_inp2.val(data.name)
  desc_inp2.val(data.desc)
  price_inp2.val(data.price)
  editmenu.parent().prev().show();
  editmenu.parent().show();
}
function del_menu(id) {
  if(!confirm("Hapus?")) {
    return;
  }
  menu_table = menu_table.filter(function(val) {
    return val.id != id;
  });
  localStorage.setItem('menu_table', JSON.stringify(menu_table));
  draw_rows();
}

$(function() {
  table = $('#table');
  let loginmenu = $("#login");
  let addmenu = $("#addmenu");
  editmenu = $("#editmenu");
  let addmenu_btn = addmenu.children(".btn");
  let name_inp = $("#name");
  let desc_inp = $("#desc");
  let price_inp = $("#price");
  name_inp2 = $("#name1");
  desc_inp2 = $("#desc1");
  price_inp2 = $("#price1");
  let password = $("#password");
  let loginbtn = loginmenu.children(".btn");
  let errmsg = $("#err_msg");
  let adminmenu = $("#adminmenu");
  let logout_btn = $("#logout");

  function toggle_form(show) {
    if(show) {
      loginmenu.show();
    } else {
      loginmenu.hide();
    }
  }

  function add_menu(name, desc, price) {
    idcounter += 1;
    menu_table.push({'id': idcounter, 'name': name, 'desc': desc, 'price': price});
    add_row(idcounter, name, desc, price);
    localStorage.setItem('menu_table', JSON.stringify(menu_table));
    localStorage.setItem('idcounter', idcounter);
  }
  
  

  if(sessionStorage.getItem('login') != null) {
    toggle_form(false);
    if(sessionStorage.getItem('login') == 'admin') {
      adminmenu.show();
    }
  } else {
    toggle_form(true);
  }
  if(localStorage.getItem('menu_table') != null) {
    menu_table = JSON.parse(localStorage.getItem('menu_table'));
    draw_rows();
  } else {
    localStorage.setItem('menu_table', JSON.stringify(menu_table));
  }
  if(localStorage.getItem('idcounter') != null) {
    idcounter = parseInt(localStorage.getItem('idcounter'));
  } else {
    localStorage.setItem('idcounter', idcounter);
  }

  logout_btn.on('click', function() {
    sessionStorage.removeItem('login');
    location.reload();
  });
  editmenu.children(".btn-warn").on('click', function() {
    menu_table.forEach(function(val, idx) {
      if(val.id == curr_id) {
        val.name = name_inp2.val();
        val.desc = desc_inp2.val();
        val.price = price_inp2.val();
      }
    });
    console.log(menu_table);
    localStorage.setItem('menu_table', JSON.stringify(menu_table));
    name_inp2.val('');
    desc_inp2.val('');
    price_inp2.val('');
    editmenu.parent().prev().hide();
    editmenu.parent().hide();
    draw_rows();
  });
  editmenu.children(".btn").on('click', function() {
    editmenu.parent().prev().hide();
    editmenu.parent().hide();
  });
  addmenu_btn.on('click', function() {
    add_menu(name_inp.val(), desc_inp.val(), price_inp.val());
    name_inp.val('');
    desc_inp.val('');
    price_inp.val('');
  });
  loginbtn.on('click', function() {
    if(password.val() != 'admin') {
      errmsg.text('Password salah');
    } else {
      toggle_form(false);
      adminmenu.show()
      sessionStorage.setItem('login', 'admin');
    }
    password.val('');
  });

});