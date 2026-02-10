import { useState } from 'react';
import DashboardLayout from '../../components/admin/DashboardLayout';
import { Download, Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export default function Importar() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const descargarPlantilla = async () => {
    try {
      const response = await api.get('/import/plantilla', {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'plantilla-menu.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al descargar plantilla');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validar que sea Excel
      const validTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (!validTypes.includes(selectedFile.type)) {
        alert('Por favor selecciona un archivo Excel (.xlsx o .xls)');
        return;
      }

      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      alert('Por favor selecciona un archivo');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('archivo', file);

      const response = await api.post('/import/menu', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(response.data.data);
      setFile(null);
      
      // Limpiar input
      const fileInput = document.getElementById('file-input');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'Error al importar menú');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Importar Menú</h1>
        <p className="text-gray-600 mt-1">
          Carga todo tu menú desde un archivo Excel
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Instrucciones */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📋 Cómo funciona
          </h2>

          <ol className="space-y-4 text-gray-700">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-wine text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              <div>
                <p className="font-medium">Descarga la plantilla</p>
                <p className="text-sm text-gray-600">
                  Obtén el archivo Excel con el formato correcto
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-wine text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              <div>
                <p className="font-medium">Completa la información</p>
                <p className="text-sm text-gray-600">
                  Llena cada fila con los datos de tus platos
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-wine text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              <div>
                <p className="font-medium">Sube el archivo</p>
                <p className="text-sm text-gray-600">
                  Importa todo tu menú en segundos
                </p>
              </div>
            </li>
          </ol>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">💡 Consejos</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• No cambies los nombres de las columnas</li>
              <li>• Los alérgenos deben ir sin acentos (lacteos, no lácteos)</li>
              <li>• Separa ingredientes y alérgenos con comas</li>
              <li>• Usa "si" o "no" para vegetariano, vegano, etc.</li>
            </ul>
          </div>

          {/* Descargar plantilla */}
          <button
            onClick={descargarPlantilla}
            className="w-full mt-6 btn-primary inline-flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Descargar Plantilla Excel
          </button>
        </div>

        {/* Upload */}
        <div className="space-y-6">
          {/* Upload area */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📤 Subir Archivo
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-wine transition-all">
              <FileSpreadsheet className="mx-auto text-gray-400 mb-4" size={48} />
              
              <input
                id="file-input"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
              
              <label
                htmlFor="file-input"
                className="cursor-pointer inline-block"
              >
                <span className="btn-primary inline-flex items-center gap-2">
                  <Upload size={20} />
                  Seleccionar Archivo
                </span>
              </label>

              {file && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-green-800 font-medium">
                    ✓ {file.name}
                  </p>
                  <p className="text-sm text-green-600">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}
            </div>

            {file && (
              <button
                onClick={handleImport}
                disabled={loading}
                className="w-full mt-4 btn-primary disabled:opacity-50"
              >
                {loading ? 'Importando...' : 'Importar Menú'}
              </button>
            )}
          </div>

          {/* Resultado */}
          {result && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                📊 Resultado de Importación
              </h2>

              <div className="space-y-3">
                {/* Éxito */}
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="text-green-600" size={24} />
                  <div className="flex-1">
                    <p className="font-medium text-green-900">
                      {result.platosCreados} platos creados
                    </p>
                    <p className="text-sm text-green-700">
                      {result.categoriasCreadas} categorías nuevas
                    </p>
                  </div>
                </div>

                {/* Errores */}
                {result.errores && result.errores.length > 0 && (
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
                      <div>
                        <p className="font-medium text-red-900">
                          {result.errores.length} errores encontrados
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                      {result.errores.map((error, index) => (
                        <div key={index} className="text-sm text-red-700 bg-white p-2 rounded">
                          <span className="font-medium">Fila {error.fila}:</span> {error.error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Acciones */}
                <div className="pt-4 border-t">
                  <a
                    href="/admin/platos"
                    className="w-full btn-primary inline-flex items-center justify-center gap-2"
                  >
                    Ver Platos Importados →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabla de referencia */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          📖 Referencia de Columnas
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Columna</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Requerida</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Ejemplo</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Notas</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono text-xs">categoria</td>
                <td className="px-4 py-2 text-green-600">Sí</td>
                <td className="px-4 py-2">Entradas</td>
                <td className="px-4 py-2 text-gray-600">Nombre de la categoría</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">nombre</td>
                <td className="px-4 py-2 text-green-600">Sí</td>
                <td className="px-4 py-2">Empanadas de carne</td>
                <td className="px-4 py-2 text-gray-600">Nombre del plato</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">descripcion</td>
                <td className="px-4 py-2 text-gray-400">No</td>
                <td className="px-4 py-2">Empanadas caseras</td>
                <td className="px-4 py-2 text-gray-600">Descripción breve</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">precio</td>
                <td className="px-4 py-2 text-green-600">Sí</td>
                <td className="px-4 py-2">1200</td>
                <td className="px-4 py-2 text-gray-600">Solo números</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">imagen_url</td>
                <td className="px-4 py-2 text-gray-400">No</td>
                <td className="px-4 py-2">https://...</td>
                <td className="px-4 py-2 text-gray-600">URL de imagen</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">ingredientes</td>
                <td className="px-4 py-2 text-gray-400">No</td>
                <td className="px-4 py-2">carne,cebolla</td>
                <td className="px-4 py-2 text-gray-600">Separados por comas</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">alergenos</td>
                <td className="px-4 py-2 text-gray-400">No</td>
                <td className="px-4 py-2">gluten,lacteos</td>
                <td className="px-4 py-2 text-gray-600">Sin acentos</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">vegetariano</td>
                <td className="px-4 py-2 text-gray-400">No</td>
                <td className="px-4 py-2">si / no</td>
                <td className="px-4 py-2 text-gray-600">si o no</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}