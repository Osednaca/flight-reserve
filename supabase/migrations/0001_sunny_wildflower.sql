/*
  # Create usuarios table and auth configuration

  1. New Tables
    - `usuarios`
      - `id` (uuid, primary key) - matches auth.users.id
      - `nombre` (text, user's full name)
      - `correo_electronico` (text, unique, user's email)
      - `telefono` (text, optional phone number)
      - `fecha_registro` (timestamp with timezone)

  2. Security
    - Enable RLS on `usuarios` table
    - Add policies for user access
*/

CREATE TABLE IF NOT EXISTS usuarios (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  nombre text NOT NULL,
  correo_electronico text UNIQUE NOT NULL,
  telefono text,
  fecha_registro timestamptz DEFAULT now()
);

ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own data
CREATE POLICY "Users can read own data"
  ON usuarios
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data"
  ON usuarios
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Service role can manage all records
CREATE POLICY "Service role full access"
  ON usuarios
  TO service_role
  USING (true)
  WITH CHECK (true);