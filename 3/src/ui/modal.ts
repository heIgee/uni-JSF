import { Modal as BootstrapModal } from 'bootstrap';
import { IBook } from '../types/index';

export class Modal {
  private modalElement: HTMLElement;
  private bootstrapModal: BootstrapModal;

  private constructor(modalHtml: string) {
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    this.modalElement = document.body.lastElementChild as HTMLElement;
    this.bootstrapModal = new BootstrapModal(this.modalElement);

    this.modalElement.addEventListener('hidden.bs.modal', () => {
      this.modalElement.remove();
    });
  }

  show(): void {
    this.bootstrapModal.show();
  }

  hide(): void {
    this.bootstrapModal.hide();
  }

  private onConfirm(callback: () => void): void {
    const confirmButton = this.modalElement.querySelector('.btn-primary');
    if (confirmButton) {
      confirmButton.addEventListener('click', callback);
    }
  }

  static showBorrowModal(
    book: IBook,
    onConfirm: (userId: string) => void,
  ): Modal {
    const modalId = `borrowModal-${book.id}`;
    const modalHtml = `
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}-label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="${modalId}-label">Borrowing a book</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              You are about to borrow the book "${book.name}" by ${book.author} (${book.releaseYear}).
              Please enter the user ID:
              <br />
              <input id="userIdInput-${book.id}" class="mt-2" type="text" placeholder="id goes here" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="confirmBorrowBtn-${book.id}">Ok</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const modal = new Modal(modalHtml);
    modal.onConfirm(() => {
      const userIdInput = document.getElementById(
        `userIdInput-${book.id}`,
      ) as HTMLInputElement;
      const userId = userIdInput.value.trim();
      onConfirm(userId);
    });

    return modal;
  }

  static showErrorModal(title: string, message: string): void {
    this.showInfoModal('error', title, message);
  }

  static showSuccessModal(title: string, message: string): void {
    this.showInfoModal('success', title, message);
  }

  private static showInfoModal(
    type: 'error' | 'success',
    title: string,
    message: string,
  ): void {
    const modalId = `${type}Modal-${Date.now()}`;
    const modalHtml = `
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}-label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${modalId}-label">${title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>${message}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const modal = new Modal(modalHtml);
    modal.show();
  }
}
