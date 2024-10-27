const resourceModel = require('../models/resourceModel'); 

// Crear un nuevo recurso
const createResource = (req, res) => {
    const { resource_name, description, role, email, phone } = req.body;

    // Validaciones básicas
  

    const newResourse = { resource_name, description, role, email, phone };

    resourceModel.createResource(newResourse, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear el recurso1' });
        }
        res.status(201).json({ message: 'Recurso creado exitosamente', resourseId: result.insertId });
    });
};


// Controlador para obtener todos los proyectos
const getAllResources = (req, res) => {
  resourceModel.getAllResources((err, resource) => {
      if (err) {
          return res.status(500).json({ error: 'Error al obtener los Recursos' });
      }
      res.status(200).json(resource);
  });
};

const getResourceById = (req, res) => {
  const resourceId = req.params.id;

  resourceModel.getResourceById(resourceId, (err, project) => {
      if (err) {
          return res.status(500).json({ error: 'Error al obtener el Recurso' });
      }
      if (!project) {
          return res.status(404).json({ error: 'Recurso no encontrado' });
      }
      res.status(200).json(project);
  });
};

// Controlador para actualizar un proyecto
const updateResource = (req, res) => {
  const resourceId = req.params.id;
  const updatedData = req.body;

  resourceModel.updateResource(resourceId, updatedData, (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Error al actualizar el Recurso' });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Recurso no encontrado' });
      }
      res.status(200).json({ message: 'Recurso actualizado exitosamente' });
  });
};

// Controlador para eliminar un proyecto
const deleteResource = (req, res) => {
  const resourceId = req.params.id;

  resourceModel.deleteResource(resourceId, (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Error al eliminar el proyecto' });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Proyecto no encontrado' });
      }
      res.status(200).json({ message: 'Proyecto eliminado exitosamente' });
  });
};



module.exports ={
  createResource,
  getAllResources,
  updateResource,
  deleteResource,
  getResourceById
}
/*

// Obtener todos los recursos
exports.getAllResources = async (req, res) => {
  try {
    const resources = await resourceModel.findAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los recursos', error });
  }
};

// Obtener un recurso por ID
exports.getResourceById = async (req, res) => {
  try {
    const resource = await resourceModel.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Recurso no encontrado' });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el recurso', error });
  }
};

// Actualizar un recurso por ID
exports.updateResource = async (req, res) => {
  try {
    const updatedResource = await resourceModel.updateById(req.params.id, req.body);
    res.json(updatedResource);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el recurso', error });
  }
};

// Eliminar un recurso por ID
exports.deleteResource = async (req, res) => {
  try {
    await resourceModel.deleteById(req.params.id);
    res.json({ message: 'Recurso eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el recurso', error });
  }*/
//};
