import { render, screen } from '@testing-library/react';
import { Button } from '@/shared/components/ui/Button';

describe('Button', () => {
  it('renders the primary variant by default', () => {
    render(<Button>Guardar</Button>);

    expect(screen.getByRole('button', { name: 'Guardar' })).toHaveClass('btn', 'btn--primary');
  });

  it('applies the requested variant', () => {
    render(<Button variant="secondary">Cancelar</Button>);

    expect(screen.getByRole('button', { name: 'Cancelar' })).toHaveClass('btn--secondary');
  });
});
