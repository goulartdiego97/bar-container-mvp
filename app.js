(() => {
  const STORAGE_KEY = "bar-container-cadastros-v1";
  const $ = id => document.getElementById(id);
  let records = loadRecords();
  let currentProfileId = null;
  let formPhoto = "";
  let editPhoto = "";
  let toastTimer;

  function loadRecords() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) return JSON.parse(saved);
    } catch (e) { console.warn("Não foi possível ler os cadastros salvos.", e); }
    const demo = [
      {id: crypto.randomUUID(), name:"Gabriel Oliveira",course:"Engenharia de Software",athletics:"Atlética CompEng",registration:"202312345",photo:"",createdAt:Date.now()},
      {id: crypto.randomUUID(), name:"Mariana Souza",course:"Engenharia Civil",athletics:"Atlética Civil",registration:"202210987",photo:"",createdAt:Date.now()},
      {id: crypto.randomUUID(), name:"Lucas Ferreira",course:"Engenharia Mecânica",athletics:"Mecânica UFSM",registration:"202310654",photo:"",createdAt:Date.now()},
      {id: crypto.randomUUID(), name:"Rafael Lima",course:"Engenharia Elétrica",athletics:"",registration:"202211222",photo:"",createdAt:Date.now()},
      {id: crypto.randomUUID(), name:"Beatriz Almeida",course:"Engenharia Química",athletics:"Química Ativa",registration:"202313333",photo:"",createdAt:Date.now()}
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    return demo;
  }
  function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); updateCounts(); }
  function escapeHtml(value="") { return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function initials(name="") { return name.trim().split(/\s+/).slice(0,2).map(s=>s[0]||"").join("").toUpperCase() || "BC"; }
  function avatarMarkup(record, extraClass="") { return `<div class="avatar ${extraClass}" ${record.photo ? `style="background-image:url('${record.photo}')"` : ""}>${record.photo ? "" : escapeHtml(initials(record.name))}</div>`; }
  function setAvatar(element, record) { element.style.backgroundImage = record && record.photo ? `url("${record.photo}")` : ""; element.textContent = record && record.photo ? "" : initials(record ? record.name : $("name").value); }
  function showToast(message) { const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2600); }
  function updateCounts() { $("totalCount").textContent=records.length; }
  function showView(name) {
    document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===`view-${name}`));
    document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===name));
    $("sidebar").classList.remove("open");
    if(name==="search") renderResults();
    window.scrollTo({top:0,behavior:"smooth"});
  }
  document.querySelectorAll("[data-view]").forEach(button=>button.addEventListener("click",()=>showView(button.dataset.view)));
  $("mobileMenu").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
  document.addEventListener("click",e=>{if(window.innerWidth<=700 && $("sidebar").classList.contains("open") && !$("sidebar").contains(e.target) && !e.target.closest("#mobileMenu")) $("sidebar").classList.remove("open");});

  function clearCreateForm() {
    $("profileForm").reset(); $("profileId").value=""; formPhoto=""; setAvatar($("formAvatar"),null);
    $("homeHeading").textContent="Cadastrar universitário"; $("saveBtn").innerHTML='Salvar cadastro <span>→</span>'; $("formMessage").textContent="";
  }
  $("resetForm").addEventListener("click",clearCreateForm);
  $("photoInput").addEventListener("change",e=>readPhoto(e.target.files[0], photo=>{formPhoto=photo;setAvatar($("formAvatar"),{name:$("name").value,photo});}));
  $("removePhoto").addEventListener("click",()=>{formPhoto="";$("photoInput").value="";setAvatar($("formAvatar"),{name:$("name").value,photo:""});});
  $("name").addEventListener("input",()=>{if(!formPhoto)setAvatar($("formAvatar"),{name:$("name").value});});
  function readPhoto(file,callback) {
    if(!file)return;
    if(!file.type.startsWith("image/")){showToast("Escolha um arquivo de imagem.");return;}
    if(file.size>3*1024*1024){showToast("A imagem deve ter até 3 MB.");return;}
    const reader=new FileReader();reader.onload=()=>callback(reader.result);reader.readAsDataURL(file);
  }
  $("profileForm").addEventListener("submit",e=>{
    e.preventDefault();
    const id=$("profileId").value;
    const data={name:$("name").value.trim(),course:$("course").value.trim(),athletics:$("athletics").value.trim(),registration:$("registration").value.trim(),photo:formPhoto};
    if(!data.name||!data.course)return;
    if(id){const index=records.findIndex(r=>r.id===id);if(index>=0)records[index]={...records[index],...data};showToast("Cadastro atualizado!");}
    else {records.unshift({id:crypto.randomUUID(),...data,createdAt:Date.now()});showToast("Cadastro salvo com sucesso!");}
    persist();clearCreateForm();showView("search");
  });

  function renderResults() {
    const q=$("searchInput").value.trim().toLocaleLowerCase("pt-BR");
    const filtered=records.filter(r=>[r.name,r.course,r.athletics,r.registration].some(v=>(v||"").toLocaleLowerCase("pt-BR").includes(q)));
    $("resultsLabel").textContent=q?`Resultados para “${$("searchInput").value.trim()}”`:"Todos os cadastros";
    $("resultCount").textContent=`${filtered.length} ${filtered.length===1?"resultado":"resultados"}`;
    $("resultsGrid").innerHTML=filtered.map(r=>`<button class="person-card" data-profile="${r.id}" aria-label="Abrir perfil de ${escapeHtml(r.name)}">${avatarMarkup(r)}<div class="person-info"><h3>${escapeHtml(r.name)}</h3><p>Curso: ${escapeHtml(r.course)}</p><p>Matrícula: ${escapeHtml(r.registration||"Não informada")}</p><p>Atlética: ${escapeHtml(r.athletics||"Não informada")}</p></div><span class="person-arrow">›</span></button>`).join("");
    $("emptyState").classList.toggle("show",filtered.length===0);
    $("resultsGrid").style.display=filtered.length?"grid":"none";
    document.querySelectorAll("[data-profile]").forEach(card=>card.addEventListener("click",()=>openProfile(card.dataset.profile)));
  }
  $("searchInput").addEventListener("input",renderResults);
  $("clearSearch").addEventListener("click",()=>{$("searchInput").value="";renderResults();$("searchInput").focus();});
  $("newFromSearch").addEventListener("click",()=>{clearCreateForm();showView("home");$("name").focus();});
  $("emptyNew").addEventListener("click",()=>{clearCreateForm();showView("home");});
  $("backToSearch").addEventListener("click",()=>showView("search"));

  function openProfile(id) {
    const r=records.find(item=>item.id===id);if(!r)return;
    currentProfileId=id;
    $("detailName").textContent=r.name;$("detailCourse").textContent=r.course;$("detailAthletics").textContent=r.athletics||"Atlética não informada";$("detailRegistration").textContent=r.registration||"Não informada";
    setAvatar($("detailAvatar"),r);$("editId").value=id;$("editName").value=r.name;$("editCourse").value=r.course;$("editAthletics").value=r.athletics||"";$("editRegistration").value=r.registration||"";editPhoto=r.photo||"";setAvatar($("editAvatar"),r);$("editMessage").textContent="";
    showView("profile");
  }
  $("editPhotoInput").addEventListener("change",e=>readPhoto(e.target.files[0],photo=>{editPhoto=photo;setAvatar($("editAvatar"),{name:$("editName").value,photo});}));
  $("editName").addEventListener("input",()=>{if(!editPhoto)setAvatar($("editAvatar"),{name:$("editName").value});});
  $("editForm").addEventListener("submit",e=>{
    e.preventDefault();const id=$("editId").value;const index=records.findIndex(r=>r.id===id);if(index<0)return;
    records[index]={...records[index],name:$("editName").value.trim(),course:$("editCourse").value.trim(),athletics:$("editAthletics").value.trim(),registration:$("editRegistration").value.trim(),photo:editPhoto};
    persist();openProfile(id);showToast("Alterações salvas com sucesso!");
  });
  $("editProfile").addEventListener("click",()=>$("editName").focus());
  $("deleteProfile").addEventListener("click",()=>{
    const r=records.find(item=>item.id===currentProfileId);if(!r)return;
    if(!confirm(`Excluir o cadastro de ${r.name}? Essa ação não pode ser desfeita.`))return;
    records=records.filter(item=>item.id!==currentProfileId);persist();showToast("Cadastro excluído.");showView("search");
  });
  updateCounts();renderResults();setAvatar($("formAvatar"),null);
})();