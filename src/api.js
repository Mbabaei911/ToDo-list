const API = {
    getWorks: () => {
      try {
        const works = JSON.parse(localStorage.getItem('works')) || [];
        return Promise.resolve({ data: works });
      } catch (error) {
        return Promise.reject(error);
      }
    },
  
    addWork: (work) => {
      try {
        const works = JSON.parse(localStorage.getItem('works')) || [];
        const newWork = { 
          ...work, 
          id: Date.now(),
          number: works.length + 1
        };
        works.push(newWork);
        localStorage.setItem('works', JSON.stringify(works));
        return Promise.resolve({ data: newWork });
      } catch (error) {
        return Promise.reject(error);
      }
    },
  
    updateWork: (id, updatedWork) => {
      try {
        const works = JSON.parse(localStorage.getItem('works')) || [];
        const index = works.findIndex(w => w.id === id);
        if (index !== -1) {
          works[index] = { ...works[index], ...updatedWork };
          localStorage.setItem('works', JSON.stringify(works));
        }
        return Promise.resolve({ data: works[index] });
      } catch (error) {
        return Promise.reject(error);
      }
    },
  
    deleteWork: (id) => {
      try {
        let works = JSON.parse(localStorage.getItem('works')) || [];
        works = works.filter(w => w.id !== id);
        localStorage.setItem('works', JSON.stringify(works));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
  
  export default API;