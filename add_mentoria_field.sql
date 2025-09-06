-- Adicionar campo is_mentoria na tabela products
ALTER TABLE products ADD COLUMN is_mentoria BOOLEAN DEFAULT FALSE;

-- Criar índice para melhor performance nas consultas de mentoria
CREATE INDEX idx_products_is_mentoria ON products(is_mentoria);

-- Comentário explicativo
COMMENT ON COLUMN products.is_mentoria IS 'Indica se o produto deve aparecer na página de mentoria';
