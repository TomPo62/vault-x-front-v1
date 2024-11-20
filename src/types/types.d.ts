export interface Docs {
  title: string;
  id: number;
  created_at: string;
  doc_src: string;
  is_children: boolean;
  parent_id: number | null;
  path: string;
  updated_at: string;
  version: number;
}

export interface DocClicked {
  onDocClick?: (docId: number) => void;
}
