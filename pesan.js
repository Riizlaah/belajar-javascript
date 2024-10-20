/// <reference path="jquery.js" />

let pesanan = {};
let menu_table = [];
let total = 0;


function set_pesanan(id, n, force = false) {
  n = parseInt(n) || 0;
  let inp = $("#"+id+" input");
  if(!force) {
    let currval = parseInt(inp.val());
    n = (currval + n < 0) ? 0 : (currval + n);
    inp.val(n);
  } else {
    inp.val(n);
  }
  if(n == 0) {
    delete pesanan[id];
  } else {
    pesanan[id] = n;
  }
  update_pesanan();
}

function update_pesanan() {
  let txt = "";
  // let total = 0;
  for(let key in pesanan) {
    let id = key.replace(/menu-/g, "");
    id = parseInt(id);
    let val = {};
    menu_table.forEach(function(v) {
      if(v.id == id) {
        val = v;
      }
    });
    total += val.price * pesanan[key];
    txt += val.name + " x " + pesanan[key] + " = Rp. " + (val.price * pesanan[key]) + "<br>";
  }
  if(total > 0) {
    txt += "<hr>Total = Rp. " + total + "<hr>";
  }
  $("#info").html(txt);
}

$(function() {
  let menus = $("#menus");
  let buy_inp = $("#buy");
  let name_inp = $("#name");
  let buy_btn = $("#buy-btn");
  if(localStorage.getItem('menu_table') != null) {
    menu_table = JSON.parse(localStorage.getItem('menu_table'));
  }
  menu_table.forEach(function(val) {
    let strid = "menu-" + val.id;
    menus.append("<div class=\"card\"><h1>"+val.name+"</h1><hr><p>"+val.desc.replace(/\n/g, "<br>")+"</p>Rp. "+val.price+"<p></p><div class=\"btn-group\" id=\""+strid+"\"><button onclick=\"set_pesanan('"+strid+"', -1)\">-</button><input type=\"text\" value=\"0\" onchange=\"set_pesanan('"+strid+"', $(this).val(), true)\" /><button onclick=\"set_pesanan('"+strid+"', 1)\">+</button></div></div>");
  });
  buy_inp.on('change', function() {
    if(buy_inp.val().match(/^\d+$/g) == null) {
      buy_inp.val('0');
    }
  });
  name_inp.on('input', function() {
    if(name_inp.val() == "") {
      buy_btn.attr("disabled", "true");
    } else {
      buy_btn.removeAttr("disabled");
    }
  });
  buy_btn.on('click', function() {
    let user_buy = parseInt(buy_inp.val())
    if(user_buy < total) {
      alert("Hai "+name_inp.val()+",uang anda kurang");
      return;
    }
    alert("Hai "+name_inp.val()+", Pembayaran Sukses ");
    if(user_buy > total) {
      alert("Hai "+name_inp.val()+", ada kembalian Rp. "+(user_buy - total));
    }
    window.location.replace("index.html");
  });
});