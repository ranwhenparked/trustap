/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { app_notifs_Notification } from '../models/app_notifs_Notification.ts';
import type { CancelablePromise } from '../core/CancelablePromise.ts';
import type { BaseHttpRequest } from '../core/BaseHttpRequest.ts';
export class NotificationsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get the notifications for the logged-in user
     * @returns app_notifs_Notification OK
     * @throws ApiError
     */
    public appNotifsGetNotifications({
        beforeId,
        afterId,
        limit = 25,
    }: {
        /**
         * Only return transactions that were created chronologically
         * before the transaction with this ID
         *
         */
        beforeId?: number,
        /**
         * Only return notifications that were created chronologically
         * after the notification with this ID (i.e. with smaller IDs)
         *
         */
        afterId?: number,
        /**
         * The maximum number of notifications to return
         *
         */
        limit?: number,
    }): CancelablePromise<Array<app_notifs_Notification>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/me/notifications',
            query: {
                'before_id': beforeId,
                'after_id': afterId,
                'limit': limit,
            },
            errors: {
                400: `Bad Request
                \`code\` can be one of the following:
                 * \`invalid_before_id\`
                 * \`invalid_after_id\`
                 * \`invalid_limit\`
                `,
            },
        });
    }
    /**
     * Get a notification by its ID
     * @returns app_notifs_Notification OK
     * @throws ApiError
     */
    public appNotifsGetNotification({
        notificationId,
    }: {
        notificationId: number,
    }): CancelablePromise<app_notifs_Notification> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/notifications/{notification_id}',
            path: {
                'notification_id': notificationId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * Mark this notification as read
     * @returns app_notifs_Notification OK
     * @throws ApiError
     */
    public appNotifsMarkNotificationAsRead({
        notificationId,
    }: {
        notificationId: number,
    }): CancelablePromise<app_notifs_Notification> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/notifications/{notification_id}/mark_as_read',
            path: {
                'notification_id': notificationId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
}
