Para rodar o build rode os seguintes comandos dentro do diretório do projeto:

yarn global add serve
serve -s build

# Teste Divulgador Inteligente — Vaga Fullstack

Obrigado pelo interesse na vaga! Abaixo estão as instruções para a realização do teste técnico.

---

### 🔗 APIs disponíveis

#### 📦 Produtos

`GET` [https://api.divulgadorinteligente.com/api/products?sitename=espionandopromos&start=0&limit=20](https://api.divulgadorinteligente.com/api/products?sitename=espionandopromos&start=0&limit=20)

#### 🎟️ Cupons

`GET` [https://api.divulgadorinteligente.com/api/coupons/public?sitename=espionandopromos&start=0&limit=10&featured=false](https://api.divulgadorinteligente.com/api/coupons/public?sitename=espionandopromos&start=0&limit=10&featured=false)

#### 🔍 Produtos por nome de cupom

`GET` [https://api.divulgadorinteligente.com/api/products?sitename=espionandopromos&start=0&limit=20&sellers[]=magalu&coupon={coupon-name}](https://api.divulgadorinteligente.com/api/products?sitename=espionandopromos&start=0&limit=20&sellers[]=magalu&coupon={coupon-name})

---

### ✅ Requisitos básicos

- Utilizar **Next.js** ou **React.js**
- Listar os produtos
- Permitir busca de produtos pelo nome
- Permitir que o usuário adicione um produto ao carrinho
- Listar cupons
- Permitir que o usuário filtre produtos por cupom

---

### 📌 Instruções

1. Faça um **fork** deste repositório na sua conta pessoal do GitHub.
2. Construa um app utilizando os endpoints acima e atendendo aos requisitos básicos.
3. Ao finalizar, envie o link do repositório para o e-mail **jeff@divulgadorinteligente.com** com o título:  
   **Teste Vaga Fullstack — Divulgador Inteligente**

---

### 🧐 O que será avaliado?

- Organização do código
- Interface e experiência do usuário (look & feel)
- Entrega dos requisitos
- **Bônus**: testes unitários

---

**Boa sorte! 😉**
