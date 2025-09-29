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
    if (isNaN(id)){
        return res.status(400).json({
            sucess:false,
            message:"O id deve ser valido"
        })
    }
    const bruxoPararemover = bruxos.find(b => b.id === id);
    if(!bruxoPararemover){
        return res.status(404).json({
            sucess:false,
            message: `Bruxo com id ${id} não existe`
        })
    }
    const bruxosFiltrados = bruxos.filter(bruxo => bruxo.id !== id)
    bruxos.splice(0, bruxos.length, ...bruxosFiltrados)
    return res.status(200).json({
            sucess:true,
            message: `O bruxo ${id} foi removido com sucesso`
        })
}
const updatebruxos = (req, res) => {
    const id = parseInt(req.params.id)
    const {nome, diretor, ano,  genero, atoresPrincipais, duracao, classificacao, avaliacaoIMDB,estudio} =req.body
    const idParaEditar = id;
    //garante que o id é um número//
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
            message: `Nenhum bruxo com o id: ${id} não foi encontrada`
        })
    }
const bruxosAtualizados = bruxos.map(bruxo=> bruxo.id === idParaEditar?{
    ...bruxo,
    ...(nome && {nome}),
    ...(diretor && {diretor}),
    ...(ano && {ano}),
    ...(genero && {genero}),
    ...(atoresPrincipais && {atoresPrincipais}),
    ...(duracao && {duracao}),
    ...(classificacao && {classificacao}),
    ...(avaliacaoIMDB && {avaliacaoIMDB}),
    ...(estudio && {estudio}),
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
export {getAllbruxos,getBruxosByid, createBruxo,deleteBruxo}