# TODO Project with Sequelize

## What? Why?

### Model Logic in MVC:

![](./intro-mvc.png)

### ORM:

![](./intro-orm.jpeg)

### SEQUELIZE:

https://sequelize.org/

![](./intro-sequelize.png)

## TODO API

### ERD:

![ERD](./erdTodoAPI.png)

1. <%= %> — Değer Yazdırır
ejs<%= değişken %>
İçindeki şeyi ekrana yazdırır. Değişken, fonksiyon sonucu vs. olabilir.
ejs<%= "Merhaba" %>        → ekrana: Merhaba
<%= 2 + 2 %>            → ekrana: 4
<%= user.name %>        → ekrana: kullanıcı adı




 <% %> — JavaScript Kodu Çalıştırır
ejs<% if(x > 5){ %>
  <p>Büyük</p>
<% } %>


3. <%- %> — HTML Olarak Yazdırır
ejs<%- "<b>Kalın</b>" %>   → ekrana kalın yazı çıkar
<%= "<b>Kalın</b>" %>   → ekrana: &lt;b&gt;Kalın&lt;/b&gt; çıkar (güvenlik için)