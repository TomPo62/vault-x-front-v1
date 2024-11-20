import { Docs } from "@/types/types";

// Définition d'un type pour les nœuds de l'arborescence avec un champ `children`
export interface TreeNode extends Docs {
  children: TreeNode[];
}

// Fonction pour construire l'arborescence
export function buildTree(docs: Docs[]): { [key: number]: TreeNode } {
  // Déclarer `tree` et `map` avec le bon type
  const tree: { [key: number]: TreeNode } = {};
  const map: { [key: number]: TreeNode } = {};

  // Créer une entrée dans le map pour chaque document
  docs.forEach((doc) => {
    map[doc.id] = { ...doc, children: [] }; // Ajouter `children` en tant que tableau vide
  });

  // Construire la hiérarchie
  docs.forEach((doc) => {
    if (doc.parent_id === null) {
      // Racine
      tree[doc.id] = map[doc.id];
    } else if (map[doc.parent_id]) {
      // Ajouter en tant qu'enfant du parent
      map[doc.parent_id].children.push(map[doc.id]);
    }
  });

  return tree;
}
