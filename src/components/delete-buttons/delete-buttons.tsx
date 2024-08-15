import './delete-buttons.css';

interface DeleteButtonsProps {
  handleDeleteConfirm: () => void;
  handleDeleteCancel: () => void;
}

export const DeleteButtons = ({
  handleDeleteCancel,
  handleDeleteConfirm,
}: DeleteButtonsProps) => {
  return (
    <tr>
      <td colSpan={7}>
        <div className='delete-confirmation'>
          <p>Are you sure you want to delete this booking?</p>
          <div className='btnContainer'>
            {' '}
            <button className='delete-button' onClick={handleDeleteConfirm}>
              Yes, delete
            </button>
            <button onClick={handleDeleteCancel} className='cancel-button'>
              Cancel
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
