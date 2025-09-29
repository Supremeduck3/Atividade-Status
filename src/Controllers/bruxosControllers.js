import dados from "../data/dados.js"
const { bruxos } = dados;

const getAllbruxos = (req,res) => {
    let resultado = bruxos;

    res.status(200).json({
        total: resultado.length,
        bruxos:resultado
    })
}
const getBruxosByid = (req,res)=>{
    let id = req.params.id;
    id = parseInt(id)
    const bruxo = bruxos.find(b => b.id === id)

    if(!bruxo){
        res.status(404).json({
            sucess:false,
            message:"Nenhum bruxo foi encontrado no beco diagoanal"
        })
    }else{
        res.status(200).json ({
            total: bruxo.length,
            bruxos:bruxo
        })
    }
}

const createBruxo = (req, res) =>{
    const {nome, casa, anoNascimento, especialidade, nivelMagia}= req.body
    const novoBruxo = {
        id: bruxos.length+1,
        nome:nome,
        casa: casa,
        anoNascimento:parseInt(anoNascimento),
        especialidade:especialidade || "Em desenvolvimento",
        nivelMagia:nivelMagia,
        ativo:true
    }
    if (!nome || !casa || !anoNascimento || !especialidade || !nivelMagia <= 0) {
        return res.status(400).json({
          sucess: false,
          messsage:
          "Feitiço mal executado! Verifique os ingredientes.",
        });
      }
      const bruxoExistente = bruxos.find(
        (b) => b.nome.toLowerCase() === nome.toLowerCase()
      );
      
      if (bruxoExistente) {
        return res.status(409).json({
          sucess: false,
          message: "Já existe um bruxo com esse nome!",
        });
      }

    bruxos.push(novoBruxo)
    res.status(201).json({
        sucess:true,
        message:"Novo bruxo matriculado em Hogwarts!",
        bruxo:novoBruxo
    })
}
const deleteBruxo = (req,res) =>{
    const id = parseInt(req.params.id)

    const bruxoPararemover = bruxos.find(b => b.id === id);
    if(!bruxoPararemover){
        return res.status(404).json({
            sucess:false,
            message: `Bruxo com id ${id} não existe`
        })
    }
    const bruxosFiltrados = bruxos.filter(bruxo => bruxo.id !== id)
    bruxos.splice(0, bruxos.length, ...bruxosFiltrados)
    const{admin}= req.body
    if(admin == false){
        return res.status(403).json({
            sucess: false,
            message: "Somente o Diretor pode executar essa magia!",
          });
        }else{
            return res.status(200).json({
                sucess:true,
                message: `O bruxo ${id} foi removido com sucesso`
            })
        }
}
const updatebruxos = (req, res) => {
    const id = parseInt(req.params.id)
    const {nome, casa, anoNascimento,  especialidade, atoresPrincipais, nivelMagia} =req.body
    const idParaEditar = id;
    if(isNaN(idParaEditar)){
        return res.status(400).json({
            sucess:false,
            message:"O id deve ser um número"
        })
    }
    const bruxoExiste = bruxos.find( bruxos => bruxos.id === idParaEditar);
    if(!bruxoExiste){
        return res.status(404).json({
            success: false,
            message: `Não é possível reparar o que não existe!`
        })
    }
const bruxosAtualizados = bruxos.map(bruxo=> bruxo.id === idParaEditar?{
    ...bruxo,
    ...(nome && {nome}),
    ...(casa && {casa}),
    ...(anoNascimento && {anoNascimento}),
    ...(especialidade && {especialidade}),
    ...(atoresPrincipais && {atoresPrincipais}),
    ...(nivelMagia && {nivelMagia}),
}
:bruxo
);
bruxos.splice(0,bruxos.length, ...bruxosAtualizados);
const bruxoEditado = bruxos.find(bruxo => bruxo.id === idParaEditar)
res.status(200).json({
    sucess: true,
    message: "Os dados foram atualizados com sucesso",
    bruxo: bruxoEditado
})
}
export {getAllbruxos,getBruxosByid, createBruxo,deleteBruxo,updatebruxos}