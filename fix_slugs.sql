-- Corrigir slugs existentes
UPDATE products 
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        REGEXP_REPLACE(
          REGEXP_REPLACE(
            REGEXP_REPLACE(
              REGEXP_REPLACE(name, '[áàâãä]', 'a', 'g'),
              '[éèêë]', 'e', 'g'
            ),
            '[íìîï]', 'i', 'g'
          ),
          '[óòôõö]', 'o', 'g'
        ),
        '[úùûü]', 'u', 'g'
      ),
      '[ç]', 'c', 'g'
    ),
    '[^a-z0-9\s-]', '', 'g'
  )
)
WHERE slug IS NOT NULL;

-- Substituir espaços por hífens
UPDATE products 
SET slug = REGEXP_REPLACE(slug, '\s+', '-', 'g')
WHERE slug IS NOT NULL;

-- Remover hífens múltiplos
UPDATE products 
SET slug = REGEXP_REPLACE(slug, '-+', '-', 'g')
WHERE slug IS NOT NULL;

-- Remover hífens no início e fim
UPDATE products 
SET slug = REGEXP_REPLACE(slug, '^-+|-+$', '', 'g')
WHERE slug IS NOT NULL;

-- Adicionar ID no final para garantir unicidade
UPDATE products 
SET slug = slug || '-' || id
WHERE slug IS NOT NULL;
