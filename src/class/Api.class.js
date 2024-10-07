import { API_URL } from "../../backend/config/env.js";
import MiniSpinner from "../Components/MiniSpinner.js";
import LoadingClass from "../hooks/Loading.js";
class Api {
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{Entregas}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // UpdateEntregas
  async UpdateEntregas(mainContainer, form, id) {
    this.text = form.querySelector(".textError");
    LoadingClass.FormLoading(this.text);
    this.inputs = form.querySelectorAll(".input");
    this.data = {};
    this.inputs.forEach(input => {
      this.data[input.name] = input.value;
    });
    this.data.id = id;

    try {
      const postData = await fetch(`${API_URL}/entregas`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-cache",
        body: JSON.stringify(this.data)
      });
      if (!postData.ok) {
        LoadingClass.FormMessage(this.text, "Erro: " + postData.statusText, "error");
        return;
      }
      this.response = await postData.json();
      const { success, error } = this.response;
      if (error) {
        LoadingClass.FormMessage(this.text, error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, success, "succes");
    } catch (error) {
      LoadingClass.FormMessage(this.text, "Erro: " + error, "error");
    }
  }
  // POST ENTREGAS / SAIDAS
  async PostEntregas(mainContainer, form) {
    this.text = form.querySelector(".textError");
    LoadingClass.FormLoading(this.text);
    this.inputs = form.querySelectorAll(".input");
    this.data = {};
    this.inputs.forEach(input => {
      this.data[input.name] = input.value;
    });
    try {
      const postData = await fetch(`${API_URL}/entregas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-cache",
        body: JSON.stringify(this.data)
      });
      if (!postData.ok) {
        LoadingClass.FormMessage(this.text, "Erro: " + postData.statusText, "error");
        return;
      }
      this.response = await postData.json();
      const { success, error } = this.response;
      if (error) {
        LoadingClass.FormMessage(this.text, error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, success, "succes");
    } catch (error) {
      LoadingClass.FormMessage(this.text, "Erro: " + error, "error");
    }
  }

  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // Data Entregas
  async DeleteDataEntregas(mainContainer, id) {
    LoadingClass.Loading(mainContainer);
    try {
      const get = await fetch(`${API_URL}/entregas`, {
        method: "DELETE", headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify({ id: id })
      });
      if (!get.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await get.json();
      if (this.data.error) {
        LoadingClass.SetErrorMessagePopUp(mainContainer, this.data?.error, "error");
        return;
      }
      LoadingClass.SetErrorMessagePopUp(mainContainer, this.data?.success, "sucess");
      return true;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  // Data Entregas
  async SearchEntregas(mainContainer, data) {
    LoadingClass.Loading(mainContainer);
    try {
      const get = await fetch(`${API_URL}/entregas/search/${data}`, { method: "GET" });
      if (!get.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await get.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  // Data Entregas
  async GetDataEntregas(mainContainer) {
    LoadingClass.Loading(mainContainer);
    try {
      const get = await fetch(`${API_URL}/entregas`, { method: "GET" });
      if (!get.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await get.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  // Data Entregas
  async GetDataEntregasBy(mainContainer, id) {
    LoadingClass.Loading(mainContainer);
    try {
      const get = await fetch(`${API_URL}/entregas/${id}`, { method: "GET" });
      if (!get.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText);
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await get.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  ////Data Home 
  async GetAllDataMome(mainContainer) {
    LoadingClass.Loading(mainContainer);
    try {
      const get = await fetch(`${API_URL}/produtos`, { method: "GET" });
      if (!get.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await get.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  // Get produtos
  async GetAllDataMomeBy(mainContainer, id) {
    LoadingClass.Loading(mainContainer);
    try {
      const getby = await fetch(`${API_URL}/produtos/${id}`, { method: "GET" });
      if (!getby.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await getby.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  //Get Produtos 
  async GetProdutos(mainContainer) {
    LoadingClass.Loading(mainContainer);
    try {
      const getby = await fetch(`${API_URL}/produtos`, { method: "GET" });
      if (!getby.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await getby.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  async GetProdutosBy(mainContainer, id) {
    LoadingClass.Loading(mainContainer);
    try {
      const getby = await fetch(`${API_URL}/produtos/${id}`, { method: "GET" });
      if (!getby.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await getby.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

   //Get Produtos 
   async SearchProdutos(mainContainer, data) {
    LoadingClass.Loading(mainContainer);
    try {
      const getby = await fetch(`${API_URL}/produtos/search/${data}`, { method: "GET" });
      if (!getby.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await getby.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }


  // ((((((((((((((((((((((((((((((((((((((((((((((((((((("Emtradas")))))))))))))))))))))))))))))))))))))))))))))))))))))
  // get Entradas 
  async GetEntradas(mainContainer) {
    LoadingClass.Loading(mainContainer);
    try {
      const getby = await fetch(`${API_URL}/entradas`, { method: "GET" });
      if (!getby.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await getby.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  async SearchEntradas(mainContainer, data) {
    LoadingClass.Loading(mainContainer);
    try {
      const getby = await fetch(`${API_URL}/entradas/search/${data}`, { method: "GET" });
      if (!getby.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await getby.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  async GetEntradasById(mainContainer, id) {
    LoadingClass.Loading(mainContainer);
    try {
      const getby = await fetch(`${API_URL}/entradas/${id}`, { method: "GET" });
      if (!getby.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await getby.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  async DeleteDataEntradas(mainContainer, id) {
    LoadingClass.Loading(mainContainer);
    try {
      const get = await fetch(`${API_URL}/entradas`, {
        method: "DELETE", headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify({ id: id })
      });
      if (!get.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await get.json();
      if (this.data.error) {
        LoadingClass.SetErrorMessagePopUp(mainContainer, this.data?.error, "error");
        return;
      }
      LoadingClass.SetErrorMessagePopUp(mainContainer, this.data?.success, "sucess");
      return true;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  // POST ENTRADAS / SAIDAS
  async PostEntradas(mainContainer, form) {
    this.text = form.querySelector(".textError");
    LoadingClass.FormLoading(this.text);
    this.inputs = form.querySelectorAll(".input");
    this.data = {};
    this.inputs.forEach(input => {
      this.data[input.name] = input.value;
    });

    console.log(this.data);
    
    try {
      const postData = await fetch(`${API_URL}/entradas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-cache",
        body: JSON.stringify(this.data)
      });
      if (!postData.ok) {
        LoadingClass.FormMessage(this.text, "Erro: " + postData.statusText, "error");
        return;
      }
      this.response = await postData.json();
      const { success, error } = this.response;
      if (error) {
        LoadingClass.FormMessage(this.text, error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, success, "succes");
    } catch (error) {
      LoadingClass.FormMessage(this.text, "Erro: " + error, "error");
    }
  }

  // UPDATE / ENTRADAS
  async UpdateEntradas(mainContainer, form, id) {
    this.text = form.querySelector(".textError");
    LoadingClass.FormLoading(this.text);
    this.inputs = form.querySelectorAll(".input");
    this.data = {};
    this.inputs.forEach(input => {
      this.data[input.name] = input.value;
    });
    this.data.id = parseInt(id);
    try {
      const postData = await fetch(`${API_URL}/entradas`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-cache",
        body: JSON.stringify(this.data)
      });
      if (!postData.ok) {
        LoadingClass.FormMessage(this.text, "Erro: " + postData.statusText, "error");
        return;
      }
      this.response = await postData.json();
      
      const { success, error } = this.response;
      if (error) {
        LoadingClass.FormMessage(this.text, error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, success, "succes");
    } catch (error) {
      LoadingClass.FormMessage(this.text, "Erro: " + error, "error");
    }
  }

  // ((((((((((((((((((((((((produtos))))))))))))))))))))))))
  // UPDATE / PRODUTOS / POST
  async PostProdutos(mainContainer, form) {
    this.text = form.querySelector(".textError");
    LoadingClass.FormLoading(this.text);
    this.inputs = form.querySelectorAll(".input");
    this.data = {};
    this.inputs.forEach(input => {
      this.data[input.name] = input.value;
    });
    try {
      const postData = await fetch(`${API_URL}/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-cache",
        body: JSON.stringify(this.data)
      });
      if (!postData.ok) {
        LoadingClass.FormMessage(this.text, "Erro: " + postData.statusText, "error");
        return;
      }
      this.response = await postData.json();
      
      const { success, error } = this.response;
      if (error) {
        LoadingClass.FormMessage(this.text, error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, success, "succes");
    } catch (error) {
      LoadingClass.FormMessage(this.text, "Erro: " + error, "error");
    }
  }

  async UpdateProdutos(mainContainer, form, id) {
    this.text = form.querySelector(".textError");
    LoadingClass.FormLoading(this.text);
    this.inputs = form.querySelectorAll(".input");
    this.data = {};
    this.inputs.forEach(input => {
      this.data[input.name] = input.value;
    });
    this.data.id = id;
    try {
      const postData = await fetch(`${API_URL}/produtos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-cache",
        body: JSON.stringify(this.data)
      });
      if (!postData.ok) {
        LoadingClass.FormMessage(this.text, "Erro: " + postData.statusText, "error");
        return;
      }
      this.response = await postData.json();
      
      const { success, error } = this.response;
      if (error) {
        LoadingClass.FormMessage(this.text, error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, success, "succes");
    } catch (error) {
      LoadingClass.FormMessage(this.text, "Erro: " + error, "error");
    }
  }

  async DeleteProdutos(mainContainer, id){
    LoadingClass.RemoveModal(mainContainer);
    LoadingClass.Loading(mainContainer);
    try {
      this.fetchDelete  = await fetch(`${API_URL}/produtos`, {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({id:id})
      });
      if(!this.fetchDelete.ok){
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao eliminar os dados: " + this.fetchDelete.statusText);
        return;
      }

      this.data = await this.fetchDelete.json();
      const { success, error } = this.data;
      if (error) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorMessagePopUp(mainContainer,error, "error");
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      LoadingClass.SetErrorMessagePopUp(mainContainer, success, "success");

    } catch (error) {
      LoadingClass.RemoveModal(mainContainer);
      LoadingClass.SetErrorMessagePopUp(mainContainer,"Erro:" + error, "error");
    }

  }
}
export default new Api();
