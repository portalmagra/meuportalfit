export function generateSlug(name: string, id?: string): string {
  // Converter para minúsculas
  let slug = name.toLowerCase()
  
  // Remover acentos
  slug = slug
    .replace(/[áàâãä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[íìîï]/g, 'i')
    .replace(/[óòôõö]/g, 'o')
    .replace(/[úùûü]/g, 'u')
    .replace(/[ç]/g, 'c')
  
  // Remover caracteres especiais, manter apenas letras, números, espaços e hífens
  slug = slug.replace(/[^a-z0-9\s-]/g, '')
  
  // Substituir espaços por hífens
  slug = slug.replace(/\s+/g, '-')
  
  // Remover hífens múltiplos
  slug = slug.replace(/-+/g, '-')
  
  // Remover hífens no início e fim
  slug = slug.replace(/^-+|-+$/g, '')
  
  // Adicionar ID se fornecido para garantir unicidade
  if (id) {
    slug = slug + '-' + id
  }
  
  return slug
}
