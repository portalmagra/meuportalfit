-- Adicionar campo slug na tabela products
ALTER TABLE products ADD COLUMN slug TEXT;

-- Criar índice único para slug
CREATE UNIQUE INDEX idx_products_slug ON products(slug);

-- Atualizar produtos existentes com slug baseado no nome
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
) || '-' || id
WHERE slug IS NULL;

-- Tornar o campo slug obrigatório
ALTER TABLE products ALTER COLUMN slug SET NOT NULL;
